import Axios, { AxiosRequestConfig } from 'axios';
import { ObjectSchema, ValidationError } from 'yup';
import { APIError } from './types';

export interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: APIError[];
}

export type ConfigField = 'headers' | 'data' | 'params' | 'method' | 'url';

export type MethodField = 'GET' | 'POST' | 'PUT' | 'DELETE';

export const baseRequest = Axios.create({
  baseURL: 'https://cmp.thclouds.com',
});

export const setToken = (token: string) => {
  return baseRequest.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });
};

const set = (field: ConfigField, value: any) => (object: any) => {
  return isEmpty(value) ? object : { ...object, [field]: value };
};

export const isEmpty = (v: any) =>
  v === undefined ||
  v === null ||
  v.length === 0 ||
  (typeof v === 'object' &&
    Object.keys(v).length === 0 &&
    v.constructor === Object);

export const setURL = (url: string) => set('url', url);

export const setMethod = (method: MethodField) => set('method', method);

export const setParams = (params: any = {}) => set('params', params);

export const setData = <T extends {}>(
  data: T,
  schema?: ObjectSchema<T>,

  // eslint-disable-next-line no-unused-vars
  postValidationTransform?: (v: any) => any
) => {
  if (!schema) {
    return set('data', data);
  }

  const updatedData =
    typeof postValidationTransform === 'function'
      ? postValidationTransform(data)
      : data;

  try {
    schema.validateSync(data, { abortEarly: false });
    return set('data', updatedData);
  } catch (error) {
    return (object: any) => ({
      ...object,
      data: updatedData,
      validationErrors: convertYupToLinodeErrors(error),
    });
  }
};

const convertYupToLinodeErrors = (
  validationError: ValidationError
): APIError[] => {
  const { inner } = validationError;

  if (inner && inner.length > 0) {
    return inner.reduce(
      (result: APIError[], innerValidationError: ValidationError) => {
        const err = convertYupToLinodeErrors(innerValidationError);
        return Array.isArray(err) ? [...result, ...err] : [...result, err];
      },
      []
    );
  }

  return [mapYupToLinodeAPIError(validationError)];
};

const mapYupToLinodeAPIError = ({
  message,
  path,
}: ValidationError): APIError => ({
  reason: message,
  ...(path && { field: path }),
});

export const setXFilter = (xFilter: any) => {
  return (object: any) =>
    isEmpty(xFilter)
      ? object
      : {
          ...object,
          headers: { ...object.headers, 'X-Filter': JSON.stringify(xFilter) },
        };
};

export const requestGenerator = <T>(...fns: Function[]): Promise<T> => {
  const config = reduceRequestConfig(...fns);
  if (config.validationErrors) {
    return Promise.reject(config.validationErrors);
  }

  return baseRequest(config).then((response) => response.data);
};

const reduceRequestConfig = (...fns: Function[]): RequestConfig =>
  fns.reduceRight((result, fn) => fn(result), {
    url: 'https://api.linode.com/v4',
    headers: {},
  });

export default requestGenerator;

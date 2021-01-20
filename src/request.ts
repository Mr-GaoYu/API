import Axios, { AxiosRequestConfig } from 'axios';

export interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: any[];
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
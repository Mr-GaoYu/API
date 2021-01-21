import { AxiosRequestConfig } from 'axios';
import { ObjectSchema } from 'yup';
import { APIError } from './types';
export interface RequestConfig extends AxiosRequestConfig {
  validationErrors?: APIError[];
}
export declare type ConfigField =
  | 'headers'
  | 'data'
  | 'params'
  | 'method'
  | 'url';
export declare type MethodField = 'GET' | 'POST' | 'PUT' | 'DELETE';
export declare const baseRequest: import('axios').AxiosInstance;
export declare const setToken: (token: string) => number;
export declare const isEmpty: (v: any) => boolean;
export declare const setURL: (url: string) => (object: any) => any;
export declare const setMethod: (method: MethodField) => (object: any) => any;
export declare const setParams: (params?: any) => (object: any) => any;
export declare const setData: <T extends {}>(
  data: T,
  schema?:
    | ObjectSchema<
        T,
        Record<string, any>,
        import('yup/lib/object').TypeOfShape<T>,
        | import('yup/lib/object').AssertsShape<T>
        | Extract<import('yup/lib/object').TypeOfShape<T>, null | undefined>
      >
    | undefined,
  postValidationTransform?: ((v: any) => any) | undefined
) => (object: any) => any;
export declare const setXFilter: (xFilter: any) => (object: any) => any;
export declare const requestGenerator: <T>(...fns: Function[]) => Promise<T>;
export default requestGenerator;

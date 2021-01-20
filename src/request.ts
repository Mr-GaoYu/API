import Axios from 'axios';

export type ConfigField = 'headers' | 'data' | 'params' | 'method' | 'url';

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
  return;
};

export const isEmpty = (v: any) =>
  v === undefined ||
  v === null ||
  v.length === 0 ||
  (typeof v === 'object' &&
    Object.keys(v).length === 0 &&
    v.constructor === Object);

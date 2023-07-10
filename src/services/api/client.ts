import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '@/configs/config';
import { getToken } from '@/utils/auth';

interface IAxiosConfig {
  baseURL: string;
  headers: {
    'Content-Type': 'application/json' | 'multipart/form-data';
  };
}

const axiosConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json' },
};
const orgAxiosConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.ORG_API_URL,
  headers: { 'Content-Type': 'application/json' },
};

const client: AxiosInstance = axios.create(axiosConfig);
const orgClient: AxiosInstance = axios.create(orgAxiosConfig);

client.interceptors.request.use(
  function (config) {
    if (window.location.pathname !== '/' && !getToken('ACCESS')) {
      window.location.replace('/');
    }
    return config;
  },
  function (error) {
    console.log(error);
  },
);

export { client, orgClient };

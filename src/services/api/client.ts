import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '@/configs/config';
import { getAuthHeader, getToken } from '@/utils/auth';

import { reissueAccessToken } from './auth';

interface IAxiosConfig {
  baseURL: string;
  headers: {
    'Content-Type': 'application/json' | 'multipart/form-data';
  };
}

const axiosConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};
const axiosFormConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
  withCredentials: true,
};

const client: AxiosInstance = axios.create(axiosConfig);
const formClient: AxiosInstance = axios.create(axiosFormConfig);

client.interceptors.request.use(
  async (config) => {
    if (window.location.pathname !== '/' && !getToken('ACCESS')) {
      window.location.replace('/');
    } else {
      config.headers.Authorization = getAuthHeader().Authorization;
    }
    return config;
  },
  (error) => {
    console.error(error);
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      await reissueAccessToken();
      return client(error.config);
    } else {
      throw error;
    }
  },
);

export { client, formClient };

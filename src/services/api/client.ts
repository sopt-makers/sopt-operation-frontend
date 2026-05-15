import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '@/configs/config';
import { destroyToken, getAuthHeader, getToken } from '@/utils/auth';

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
const orgAxiosConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.ORG_API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
};

const client: AxiosInstance = axios.create(axiosConfig);
const orgClient: AxiosInstance = axios.create(orgAxiosConfig);

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
  async (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          if (error?.config?.headers['Reissue-Request']) {
            destroyToken('ACCESS');
            window.location.replace('/');
          }
          error.message = '요청을 처리하는데 실패했어요';
          return Promise.reject(error);
        case 401:
          if (error?.config?.headers['Reissue-Request']) {
            destroyToken('ACCESS');
            window.location.replace('/');
            return;
          }
          const reissueResult = await reissueAccessToken();
          if (reissueResult && !reissueResult.success) {
            destroyToken('ACCESS');
            window.location.replace('/');
            return;
          }
          if (error.config) {
            return client(error.config);
          }
          error.message = '만료된 토큰이에요';
          return Promise.reject(error);
        case 403:
          error.message = '권한이 없어요';
          return Promise.reject(error);
        case 404:
          error.message = '잘못된 요청이에요';
          return Promise.reject(error);
        case 500:
          error.message = '알 수 없는 에러예요';
          return Promise.reject(error);
        default:
          error.message = '알 수 없는 에러예요';
          return Promise.reject(error);
      }
    } else {
      throw error;
    }
  },
);

export { client, orgClient };

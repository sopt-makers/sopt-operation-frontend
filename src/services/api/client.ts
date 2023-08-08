import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

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
          return { status: 400, error: '요청을 처리하는데 실패했어요' };
        case 401:
          await reissueAccessToken();
          if (error.config) {
            return client(error.config);
          }
          return { status: 401, error: '만료된 토큰이에요' };
        case 403:
          return { status: 403, error: '권한이 없어요' };
        case 404:
          return { status: 404, error: '잘못된 요청이에요' };
        case 500:
          return { status: 500, error: '알 수 없는 에러예요' };
        default:
          return {
            status: error.response.status,
            error: '알 수 없는 에러예요',
          };
      }
    } else {
      throw error;
    }
  },
);

export { client, orgClient };

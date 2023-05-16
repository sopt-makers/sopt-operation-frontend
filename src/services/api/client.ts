import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

import config from '@/configs/config';

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
const axiosFormConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.API_URL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const axiosOrgConfig: AxiosRequestConfig<IAxiosConfig> = {
  baseURL: config.ORG_API_URL,
  headers: { 'Content-Type': 'application/json' },
};

export const client: AxiosInstance = axios.create(axiosConfig);
export const formClient: AxiosInstance = axios.create(axiosFormConfig);

export const orgClient: AxiosInstance = axios.create(axiosOrgConfig);

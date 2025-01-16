import axios from 'axios';

import config from '@/configs/config';
import { getToken } from '@/utils/auth';

import { fetcher } from '../api';

export const getAdminInfo = async () => {
  const { data } = await fetcher.GET('/admin', {
    params: {
      query: {
        generation: '34',
      },
    },
  });

  return data;
};

export const postNews = async (formData: FormData) => {
  const res = await axios.post(
    `${config.ORG_API_URL}/v2/admin/news`,
    formData,
    {
      headers: {
        Authorization: getToken('ACCESS'),
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res;
};

export const deleteNews = async (id: number) => {
  const response = await fetcher.POST('/admin/news/delete', {
    body: {
      id,
    },
  });

  return response;
};

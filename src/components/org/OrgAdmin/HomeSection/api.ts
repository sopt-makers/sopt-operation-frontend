import axios from 'axios';

import config from '@/configs/config';
import { getToken } from '@/utils/auth';
import { ACTIVITY_GENERATION } from '@/utils/generation';

import { fetcher } from '../api';

export const getAdminInfo = async () => {
  const { data } = await fetcher.GET('/admin', {
    params: {
      query: {
        generation: ACTIVITY_GENERATION,
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
  const res = await axios.post(
    `${config.ORG_API_URL}/v2/admin/news/delete`,
    {
      id,
    },
    {
      headers: {
        Authorization: getToken('ACCESS'),
      },
    },
  );

  return res;
};

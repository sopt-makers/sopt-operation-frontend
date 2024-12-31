import axios from 'axios';

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
    `${process.env.NEXT_PUBLIC_ORG_API}/admin/news`,
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
    `${process.env.NEXT_PUBLIC_ORG_API}/admin/news/delete`,
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

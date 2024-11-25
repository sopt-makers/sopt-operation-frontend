import axios from 'axios';

import { fetch } from '@/components/org/api';

export const getAdminInfo = async () => {
  const { data } = await fetch.GET('/admin', {
    params: {
      query: {
        generation: '34',
      },
    },
  });

  return data;
};

export const postNews = async (formData: FormData) => {
  const res = await fetch.POST('/admin/news', {
    body: formData,
  });

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
        Authorization:
          'eyJyZWdEYXRlIjoxNzMyNTEyOTU1MDUxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5IiwiZXhwIjoxNzMyNTMwOTU1fQ.OftGPHU629hZd0p7ETZb_HcgEhBcg5-doC9Nl8WWVuI',
      },
    },
  );

  return res;
};

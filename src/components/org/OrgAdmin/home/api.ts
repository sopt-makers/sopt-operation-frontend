import axios from 'axios';

import { fetch } from '@/components/org/api';
import { getToken } from '@/utils/auth';

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

export const postNews = async (formData: any) => {
  const res = await fetch.POST('/admin/news', formData);

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

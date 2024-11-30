import createFetch from 'openapi-fetch';

import { paths } from '@/__generated__/api';
import { AddAdminRequestDto } from '@/__generated__/org-types/data-contracts';
import { getToken } from '@/utils/auth';

export const fetcher = createFetch<paths>({
  baseUrl: process.env.NEXT_PUBLIC_ORG_API,
  headers: {
    Authorization: getToken('ACCESS'),
  },
});

export const sendData = async (data: AddAdminRequestDto) => {
  const res = await fetcher.POST('/admin', {
    body: data,
  });

  return res.data;
};

export const sendPresignedURL = async (url: string, data: BodyInit) => {
  const res = await fetch(url, {
    method: 'POST',
    body: data,
  });

  return res;
};

export const sendDataConfirm = async (data: { generation: number }) => {
  const res = await fetcher.POST('/admin/confirm', {
    body: data,
  });

  return res;
};

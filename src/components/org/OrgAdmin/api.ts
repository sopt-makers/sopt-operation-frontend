import createFetch from 'openapi-fetch';

import { paths } from '@/__generated__/api';
import { AddAdminRequestDto } from '@/__generated__/org-types/data-contracts';
import config from '@/configs/config';
import { getToken } from '@/utils/auth';

export const fetcher = createFetch<paths>({
  baseUrl: `${config.ORG_API_URL}/v2`,
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

import createFetch from 'openapi-fetch';

import { paths } from '@/__generated__/api';
import config from '@/configs/config';
import { getToken } from '@/utils/auth';

export const fetcher = createFetch<paths>({
  baseUrl: `${config.ORG_API_URL}/v2`,
  headers: {
    Authorization: getToken('ACCESS'),
  },
});

export const soptFetcher = createFetch<paths>({
  baseUrl: `${config.SOPT_API_URL}/v2`,
  headers: {
    Authorization: getToken('ACCESS'),
  },
});

export const sendPresignedURL = async (url: string, data: BodyInit) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: data,
  });

  return res;
};

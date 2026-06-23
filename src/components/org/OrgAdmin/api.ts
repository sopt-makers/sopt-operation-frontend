import createFetch, { type Middleware } from 'openapi-fetch';

import { paths } from '@/__generated__/api';
import config from '@/configs/config';
import { getToken } from '@/utils/auth';

const orgAuthMiddleware: Middleware = {
  onRequest({ request }) {
    const token = getToken('ACCESS');

    if (token) {
      request.headers.set('Authorization', token);
    } else {
      request.headers.delete('Authorization');
    }

    return request;
  },
};

const soptAuthMiddleware: Middleware = {
  onRequest({ request }) {
    const token = getToken('ACCESS');

    if (token) {
      request.headers.set('Authorization', token);
    } else {
      request.headers.delete('Authorization');
    }

    return request;
  },
};

export const fetcher = createFetch<paths>({
  baseUrl: `${config.ORG_API_URL}/v2`,
});

fetcher.use(orgAuthMiddleware);

export const soptFetcher = createFetch<paths>({
  baseUrl: `${config.SOPT_API_URL}/v2`,
});

soptFetcher.use(soptAuthMiddleware);

export const sendPresignedURL = async (url: string, data: BodyInit) => {
  const res = await fetch(url, {
    method: 'PUT',
    body: data,
  });

  return res;
};

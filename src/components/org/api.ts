import createFetch from 'openapi-fetch';

import { paths } from '@/__generated__/api';
import { getToken } from '@/utils/auth';

export const fetch = createFetch<paths>({
  baseUrl: process.env.NEXT_PUBLIC_ORG_API,
  headers: {
    Authorization: getToken('ACCESS'),
  },
});

import createFetch from 'openapi-fetch';

import { paths } from '@/__generated__/api';

export const fetch = createFetch<paths>({
  baseUrl: process.env.NEXT_PUBLIC_ORG_API,
  headers: {
    Authorization:
      'eyJyZWdEYXRlIjoxNzMyNTEyOTU1MDUxLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5IiwiZXhwIjoxNzMyNTMwOTU1fQ.OftGPHU629hZd0p7ETZb_HcgEhBcg5-doC9Nl8WWVuI',
  },
});

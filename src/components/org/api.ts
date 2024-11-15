import createFetch from 'openapi-fetch';

import { paths } from '@/__generated__/api';

export const fetch = createFetch<paths>({
  baseUrl: process.env.NEXT_PUBLIC_ORG_API,
});

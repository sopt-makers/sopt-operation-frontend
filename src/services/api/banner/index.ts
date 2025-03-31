import { client } from '@/services/api/client';

export const fetchBannerList = async () => {
  const { data } = await client.get('/banners');

  return data;
};

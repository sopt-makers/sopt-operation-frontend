import { client } from '@/services/api/client';
import { AxiosResponse } from 'axios';

export const fetchBannerList = async () => {
  const { data }: AxiosResponse<{ success: boolean; data: Banner[] }> =
    await client.get('/banners');

  return data.data;
};

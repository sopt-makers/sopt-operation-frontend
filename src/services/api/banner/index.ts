import { client } from '@/services/api/client';
import { AxiosResponse } from 'axios';

export const fetchBannerList = async (
  status: string = '',
  sort: string = 'status',
) => {
  if (!status && sort === 'status') {
    const { data }: AxiosResponse<{ success: boolean; data: Banner[] }> =
      await client.get('/banners');
    return data.data;
  }

  let queryString = '';

  if (status) {
    queryString = `?status=${status}`;
  }

  queryString += queryString ? `&sort=${sort}` : `?sort=${sort}`;

  const { data }: AxiosResponse<{ success: boolean; data: Banner[] }> =
    await client.get(`/banners${queryString}`);

  return data.data;
};

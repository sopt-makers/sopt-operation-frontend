import { AxiosResponse } from 'axios';

import {
  BannerDetailRequest,
  BannerDetailResponse,
} from '@/components/bannerAdmin/types/api';
import { client } from '@/services/api/client';

export const postNewBanner = async (bannerData: BannerDetailRequest) => {
  const response = await client.post('/banners', bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const deleteBanner = async (bannerId: number) => {
  const response = await client.delete(`/banners/${bannerId}`);

  return response;
};

export const putBanner = async (
  bannerId: number,
  bannerData: BannerDetailRequest,
) => {
  const response = await client.put(`/banners/${bannerId}`, bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getBannerDetail = async (bannerId: number) => {
  const { data }: AxiosResponse<BannerDetailResponse> = await client.get(
    `/banners/${bannerId}`,
  );

  return data;
};

export const fetchBannerList = async (
  status: string = '',
  sort: string = 'status',
): Promise<{ banners: Banner[]; length: number }> => {
  if (!status && sort === 'status') {
    const { data }: AxiosResponse<{ success: boolean; data: Banner[] }> =
      await client.get('/banners');

    return {
      banners: data.data,
      length: data.data.length,
    };
  }

  let queryString = '';

  if (status) {
    queryString = `?status=${status}`;
  }

  queryString += queryString ? `&sort=${sort}` : `?sort=${sort}`;

  const { data }: AxiosResponse<{ success: boolean; data: Banner[] }> =
    await client.get(`/banners${queryString}`);

  return {
    banners: data.data,
    length: data.data.length,
  };
};

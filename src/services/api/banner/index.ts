import {
  BannerDetailRequest,
  BannerDetailResponse,
} from '@/components/bannerAdmin/types/api';
import { client } from '@/services/api/client';

import { AxiosResponse } from 'axios';

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

export const fetchBannerList = async () => {
  const { data }: AxiosResponse<{ success: boolean; data: Banner[] }> =
    await client.get('/banners');

  return data.data;
};

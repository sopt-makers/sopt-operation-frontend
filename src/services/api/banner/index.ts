import { BannerType } from '@/components/bannerAdmin/types/api';
import { client } from '@/services/api/client';

export const postNewBanner = async (bannerData: BannerType) => {
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

export const putBanner = async (bannerData: BannerType, bannerId: number) => {
  const response = await client.put(`/banners/${bannerId}`, bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getBannerDetail = async (bannerId: number) => {
  const { data } = await client.get(`/banners/${bannerId}`);

  return data;
};

export const getBannerList = async () => {
  const { data } = await client.get('/banners');

  return data;
};

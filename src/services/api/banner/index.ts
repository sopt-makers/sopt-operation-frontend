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

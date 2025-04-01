import { BannerType } from '@/components/bannerAdmin/types/api';
import { client } from '@/services/api/client';

export const postNewBanner = async (bannerData: BannerType) => {
  await client.post('/banners', bannerData);
};

import { useMutation } from 'react-query';

import { BannerType } from '@/components/bannerAdmin/types/api';
import { postNewBanner } from '@/services/api/banner';

export const useCreateBanner = (bannerData: BannerType) => {
  return useMutation(['banner', bannerData], () => postNewBanner(bannerData));
};

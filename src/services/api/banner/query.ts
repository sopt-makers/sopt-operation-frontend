import { useMutation } from 'react-query';

import { BannerType } from '@/components/bannerAdmin/types/api';
import { postNewBanner } from '@/services/api/banner';

export const usePostNewBanner = () => {
  return useMutation({
    mutationFn: (bannerData: BannerType) => postNewBanner(bannerData),
  });
};

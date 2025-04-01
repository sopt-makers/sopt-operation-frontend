import { useMutation, useQuery } from 'react-query';

import { BannerType } from '@/components/bannerAdmin/types/api';
import {
  deleteBanner,
  getBannerDetail,
  getBannerList,
  postNewBanner,
  putBanner,
} from '@/services/api/banner';

export const usePostNewBanner = () => {
  return useMutation({
    mutationFn: (bannerData: BannerType) => postNewBanner(bannerData),
  });
};

export const useDeleteBanner = () => {
  return useMutation({
    mutationFn: (bannerId: number) => deleteBanner(bannerId),
  });
};

export const usePutBanner = () => {
  return useMutation({
    mutationFn: ({
      bannerId,
      bannerData,
    }: {
      bannerId: number;
      bannerData: BannerType;
    }) => putBanner(bannerData, bannerId),
  });
};

export const useGetBannerDetail = (bannerId: number) => {
  return useQuery<BannerType>({
    queryKey: ['banner', 'detail'],
    queryFn: () => getBannerDetail(bannerId),
  });
};

interface BannerListResponse {
  success: boolean;
  message: string;
  data: { banners: BannerType[] };
}

export const useGetBannerList = () => {
  return useQuery<BannerListResponse>({
    queryKey: ['banner', 'list'],
    queryFn: () => getBannerList(),
  });
};

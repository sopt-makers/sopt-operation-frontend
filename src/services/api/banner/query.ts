import { useMutation, useQuery } from 'react-query';

import {
  BannerDetailResponse,
  BannerDetailRequest,
} from '@/components/bannerAdmin/types/api';

import {
  deleteBanner,
  getBannerDetail,
  getBannerList,
  postNewBanner,
  putBanner,
} from '@/services/api/banner';

export const usePostNewBanner = () => {
  return useMutation({
    mutationFn: (bannerData: BannerDetailRequest) => postNewBanner(bannerData),
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
      bannerData: BannerDetailRequest;
    }) => putBanner(bannerData, bannerId),
  });
};

export const useGetBannerDetail = (bannerId: number) => {
  return useQuery<BannerDetailResponse>({
    queryKey: ['banner', 'detail'],
    queryFn: () => getBannerDetail(bannerId),
    enabled: bannerId !== 0,
    staleTime: 5000,
  });
};

interface BannerListResponse {
  success: boolean;
  message: string;
  data: { banners: BannerDetailRequest[] };
}

export const useGetBannerList = () => {
  return useQuery<BannerListResponse>({
    queryKey: ['banner', 'list'],
    queryFn: () => getBannerList(),
  });
};

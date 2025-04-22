import { useMutation, useQuery } from 'react-query';

import { BannerDetailRequest } from '@/components/bannerAdmin/types/api';
import { DEFAULT_BANNER_LIST_LIMIT, INIT_BANNER_LIST_PAGE } from '@/constants';
import {
  deleteBanner,
  fetchBannerList,
  getBannerDetail,
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
    }) => putBanner(bannerId, bannerData),
  });
};

export const useGetBannerDetail = (bannerId: number) => {
  return useQuery({
    queryKey: ['banner', 'detail'],
    queryFn: () => getBannerDetail(bannerId),
    enabled: bannerId !== 0,
    cacheTime: 0,
  });
};

export const useFetchBannerList = (
  status = '',
  sort = 'status',
  page = INIT_BANNER_LIST_PAGE,
  limit = DEFAULT_BANNER_LIST_LIMIT,
) => {
  return useQuery(['bannerList', status, sort, page, limit], () =>
    fetchBannerList(status, sort, page, limit),
  );
};

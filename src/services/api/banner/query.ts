import { useQuery } from 'react-query';

import { getBannerList } from './index';

export const useGetBannerList = (
  status: BannerList['status'],
  sort: BannerListSort,
) => {
  return useQuery<BannerListResponse, Error>(
    ['bannerList'],
    () => getBannerList(status, sort),
    {
      staleTime: 10 * 60 * 1000,
    },
  );
};

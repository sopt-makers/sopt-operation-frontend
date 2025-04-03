import { fetchBannerList } from '@/services/api/banner';
import { useQuery } from 'react-query';

export const useFetchBannerList = (
  status: string = '',
  sort: string = 'status',
) => {
  return useQuery(['bannerList', status, sort], () =>
    fetchBannerList(status, sort),
  );
};

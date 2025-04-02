import { fetchBannerList } from '@/services/api/banner';
import { useQuery } from 'react-query';

export const useFetchBannerList = () => {
  return useQuery('bannerList', fetchBannerList);
};

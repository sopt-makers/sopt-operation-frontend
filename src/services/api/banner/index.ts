import { client } from '../client';

export const getBannerList = async (
  status: BannerList['status'],
  sort: BannerListSort,
) => {
  const res = await client.get(`/banners?status=${status}&sort=${sort}`);

  return res.data.data;
};

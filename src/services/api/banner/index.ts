import { AxiosResponse } from 'axios';

import {
  BannerDetailRequest,
  BannerDetailResponse,
  BannerListResponse,
} from '@/components/bannerAdmin/types/api';
import { DEFAULT_BANNER_LIST_LIMIT, INIT_BANNER_LIST_PAGE } from '@/constants';
import { client } from '@/services/api/client';

export const postNewBanner = async (bannerData: BannerDetailRequest) => {
  const response = await client.post('/banners', bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const deleteBanner = async (bannerId: number) => {
  const response = await client.delete(`/banners/${bannerId}`);

  return response;
};

export const putBanner = async (
  bannerId: number,
  bannerData: BannerDetailRequest,
) => {
  const response = await client.put(`/banners/${bannerId}`, bannerData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getBannerDetail = async (bannerId: number) => {
  const { data }: AxiosResponse<BannerDetailResponse> = await client.get(
    `/banners/${bannerId}`,
  );

  return data;
};

export const fetchBannerList = async (
  status = '',
  sort = 'status',
  page = INIT_BANNER_LIST_PAGE,
  limit = DEFAULT_BANNER_LIST_LIMIT,
) => {
  let queryString = '';

  if (status) {
    queryString = `?status=${status}`;
  }

  queryString += queryString ? `&sort=${sort}` : `?sort=${sort}`;
  queryString += `&page=${page}&limit=${limit}`;

  const { data }: AxiosResponse<BannerListResponse> = await client.get(
    `/banners${queryString}`,
  );

  return {
    banners: data.data.data,
    totalCount: data.data.totalCount,
    totalPage: data.data.totalPage,
    currentPage: data.data.currentPage,
    hasNextPage: data.data.hasNextPage,
    hasPrevPage: data.data.hasPrevPage,
  };
};

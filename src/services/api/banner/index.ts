import {
  BannerDetailRequest,
  BannerDetailResponse,
} from '@/components/bannerAdmin/types/api';
import { client } from '@/services/api/client';

import { AxiosResponse } from 'axios';

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
  status: string = '',
  sort: string = 'status',
  page: number = 1,
  limit: number = 10,
): Promise<{
  banners: Banner[];
  totalCount: number;
  totalPage: number;
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}> => {
  let queryString = '';

  if (status) {
    queryString = `?status=${status}`;
  }

  queryString += queryString ? `&sort=${sort}` : `?sort=${sort}`;
  queryString += `&page=${page}&limit=${limit}`;

  const {
    data,
  }: AxiosResponse<{
    success: boolean;
    message: string;
    data: {
      limit: number;
      totalCount: number;
      totalPage: number;
      currentPage: number;
      data: Banner[];
      hasNextPage: boolean;
      hasPrevPage: boolean;
    };
  }> = await client.get(`/banners${queryString}`);

  return {
    banners: data.data.data,
    totalCount: data.data.totalCount,
    totalPage: data.data.totalPage,
    currentPage: data.data.currentPage,
    hasNextPage: data.data.hasNextPage,
    hasPrevPage: data.data.hasPrevPage,
  };
};

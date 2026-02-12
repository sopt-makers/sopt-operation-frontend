import axios from 'axios';

import config from '@/configs/config';
import { getToken } from '@/utils/auth';
import { ACTIVITY_GENERATION } from '@/utils/generation';

import { fetcher } from '../api';

interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
  expiresIn: number;
  fileKey: string;
}

export const getAdminInfo = async () => {
  const { data } = await fetcher.GET('/admin', {
    params: {
      query: {
        generation: ACTIVITY_GENERATION,
      },
    },
  });

  return data;
};

const IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
] as const;

export const getPresignedUrl = async (
  file: File,
): Promise<PresignedUrlResponse> => {
  if (!IMAGE_TYPES.includes(file.type as (typeof IMAGE_TYPES)[number])) {
    throw new Error('지원하지 않는 이미지 형식입니다. (jpeg, jpg, png, gif, webp만 가능)');
  }

  const extension = file.name.split('.').pop();
  const fileName = `news-${Date.now()}.${extension}`;

  const { data } = await fetcher.POST('/s3/presigned-url', {
    body: {
      fileName,
      contentType: file.type,
      directory: 'news/',
    },
  });

  if (!data) {
    throw new Error('Failed to get presigned URL');
  }

  return data as PresignedUrlResponse;
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  const res = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
  });

  return res;
};

export const postNewsV2 = async (data: {
  imageUrl: string;
  title: string;
  link: string;
}) => {
  const res = await fetcher.POST('/admin/news/v2', {
    body: data,
  });

  return res;
};

export const deleteNews = async (id: number) => {
  const res = await fetcher.POST('/admin/news/delete', {
    body: {
      id,
    },
  });

  return res;
};

/** 최신소식 추가 (기존 멀티파트 방식 - deprecated) */
export const postNews = async (formData: FormData) => {
  const res = await axios.post(
    `${config.ORG_API_URL}/v2/admin/news`,
    formData,
    {
      headers: {
        Authorization: getToken('ACCESS'),
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return res;
};

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

export const getPresignedUrl = async (
  file: File,
): Promise<PresignedUrlResponse> => {
  const extension = file.name.split('.').pop();
  const fileName = `news-${Date.now()}.${extension}`;

  const { data } = await axios.post<PresignedUrlResponse>(
    `${config.ORG_API_URL}/v2/s3/presigned-url`,
    {
      fileName,
      contentType: file.type,
      directory: 'news/',
    },
    {
      headers: {
        Authorization: getToken('ACCESS'),
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
};

export const uploadToS3 = async (presignedUrl: string, file: File) => {
  const res = await axios.put(presignedUrl, file, {
    headers: {
      'Content-Type': file.type,
    },
  });

  return res;
};

export const postNewsV2 = async (data: {
  imageUrl: string;
  title: string;
  link: string;
}) => {
  const res = await axios.post(
    `${config.ORG_API_URL}/v2/admin/news/v2`,
    data,
    {
      headers: {
        Authorization: getToken('ACCESS'),
        'Content-Type': 'application/json',
      },
    },
  );

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

export const deleteNews = async (id: number) => {
  const res = await axios.post(
    `${config.ORG_API_URL}/v2/admin/news/delete`,
    {
      id,
    },
    {
      headers: {
        Authorization: getToken('ACCESS'),
      },
    },
  );

  return res;
};

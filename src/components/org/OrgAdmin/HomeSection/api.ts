import type { AddAdminHomeRequestDto } from '@/__generated__/org-types/data-contracts';
import type { News } from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsItem';
import type { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';
import { ACTIVITY_GENERATION } from '@/utils/generation';

import { fetcher, soptFetcher } from '../api';

interface PresignedUrlResponse {
  presignedUrl: string;
  fileUrl: string;
  expiresIn: number;
  fileKey: string;
}

type ReviewsResponse =
  | Review[]
  | {
      data?: Review[];
      review?: Review[];
      reviews?: Review[];
    };

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
    throw new Error(
      '지원하지 않는 이미지 형식입니다. (jpeg, jpg, png, gif, webp만 가능)',
    );
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

export const getNews = async (id: number) => {
  const { data } = await fetcher.GET('/admin/news/news', {
    params: {
      query: {
        id: String(id),
      },
    },
  });

  return data;
};

export const patchNews = async (id: number, formData: FormData) => {
  const res = await fetcher.PATCH('/admin/news/{id}', {
    params: {
      path: {
        id,
      },
    },
    body: {
      image: formData.get('image') as string,
      title: formData.get('title') as string,
      link: formData.get('link') as string,
    },
  });

  return res;
};

export const postNews = async (formData: FormData) => {
  const res = await fetcher.POST('/admin/news', {
    body: {
      image: formData.get('image') as string,
      title: formData.get('title') as string,
      link: formData.get('link') as string,
    },
  });

  return res;
};

export const getReviews = async () => {
  const { data } = await soptFetcher.GET('/homepage-reviews');
  const reviewsData = data as ReviewsResponse | undefined;

  if (!reviewsData) {
    return [];
  }

  if (Array.isArray(reviewsData)) {
    return reviewsData;
  }

  return reviewsData.data ?? reviewsData.review ?? reviewsData.reviews ?? [];
};

export const postReview = async (formData: FormData) => {
  const res = await fetcher.POST('/homepage-reviews', {
    body: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      authorInfo: formData.get('authorInfo') as string,
    },
  });

  return res;
};

export const patchReview = async (id: number, formData: FormData) => {
  const res = await soptFetcher.PATCH('/homepage-reviews/{id}', {
    params: {
      path: {
        id,
      },
    },
    body: {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      authorInfo: formData.get('authorInfo') as string,
    },
  });

  return res;
};

export const extractFileNameFromUrl = (url: string) => {
  try {
    const pathname = new URL(url).pathname;

    return decodeURIComponent(pathname.split('/').pop() ?? '');
  } catch {
    return decodeURIComponent(url.split('/').pop() ?? url);
  }
};

type PostHomeTabBody = Omit<AddAdminHomeRequestDto, 'news'> & {
  news?: { image: string; title: string; link: string }[];
};

export const postHomeTab = async (body: PostHomeTabBody) => {
  const { data, error } = await soptFetcher.POST('/admin/home', { body });

  if (error || !data) {
    throw new Error('홈 탭 배포 요청에 실패했습니다.');
  }

  return data;
};

export const postHomeTabConfirm = async () => {
  const { data, error } = await soptFetcher.POST('/admin/home/confirm', {
    body: {
      generation: Number(ACTIVITY_GENERATION),
    },
  });

  if (error || !data) {
    throw new Error('홈 탭 배포 확정에 실패했습니다.');
  }

  return data;
};

export type DeployHomeInput = {
  homeHeaderImageFileName: string;
  homeHeaderImageFile?: File;
  reviewItems: Review[];
  newsItems: News[];
};

export const deployHomeTab = async ({
  homeHeaderImageFileName,
  homeHeaderImageFile,
  reviewItems,
  newsItems,
}: DeployHomeInput) => {
  const newsDetails = await Promise.all(
    newsItems.map((item) => getNews(item.id)),
  );

  const deployResponse = await postHomeTab({
    generation: Number(ACTIVITY_GENERATION),
    homeHeaderImageFileName,
    review: reviewItems.map(({ title, content, authorInfo }) => ({
      title,
      content: content ?? '',
      authorInfo: authorInfo ?? '',
    })),
    news: newsDetails
      .filter((news): news is NonNullable<typeof news> => Boolean(news))
      .map((news) => ({
        image: extractFileNameFromUrl(news.image),
        title: news.title,
        link: news.link,
      })),
  });

  if (homeHeaderImageFile && deployResponse.homeHeaderImage) {
    const uploadResponse = await uploadToS3(
      deployResponse.homeHeaderImage,
      homeHeaderImageFile,
    );

    if (!uploadResponse.ok) {
      throw new Error('홈 헤더 이미지 업로드에 실패했습니다.');
    }
  }

  return postHomeTabConfirm();
};

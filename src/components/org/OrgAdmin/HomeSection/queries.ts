import { useToast } from '@sopt-makers/ui';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  DELETE_TOAST_OPTION,
  EDIT_TOAST_OPTION,
  TOAST_OPTION,
} from '@/components/org/OrgAdmin/HomeSection/_constants/constants';
import {
  deleteNews,
  getAdminInfo,
  getNews,
  getPresignedUrl,
  getReviews,
  patchNews,
  patchReview,
  postNewsV2,
  postReview,
  uploadToS3,
} from '@/components/org/OrgAdmin/HomeSection/api';

export const useAdminInfoQuery = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: getAdminInfo,
  });
};

export const useReviewsQuery = () => {
  return useQuery({
    queryKey: ['homepage-reviews'],
    queryFn: getReviews,
  });
};

export const useReviewQuery = (reviewId?: number) => {
  return useQuery({
    queryKey: ['homepage-reviews'],
    queryFn: getReviews,
    enabled: Boolean(reviewId),
    select: (reviews) => reviews.find((review) => review.id === reviewId),
  });
};

export const useAddReviewMutation = () => {
  return useMutation({
    mutationFn: postReview,
  });
};

export const useEditReviewMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: ({ id, formData }: { id: number; formData: FormData }) =>
      patchReview(id, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['homepage-reviews'],
      });
      open(EDIT_TOAST_OPTION.success);
    },
    onError: () => {
      open(EDIT_TOAST_OPTION.error);
    },
  });
};

export const useNewsQuery = (id?: number) => {
  return useQuery({
    queryKey: ['admin', 'news', id],
    queryFn: () => getNews(id ?? 0),
    enabled: Boolean(id),
  });
};

export const useAddNewsMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: async (data: { file: File; title: string; link: string }) => {
      const presignedData = await getPresignedUrl(data.file);
      await uploadToS3(presignedData.presignedUrl, data.file);

      return await postNewsV2({
        imageUrl: presignedData.fileUrl,
        title: data.title,
        link: data.link,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin'],
      });

      open(TOAST_OPTION.success);
    },
    onError: () => {
      open(TOAST_OPTION.error);
    },
  });
};

export const useEditNewsMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: async (data: {
      id: number;
      file?: File;
      title: string;
      link: string;
    }) => {
      const formData = new FormData();

      if (data.file) {
        formData.append('image', data.file);
      }

      formData.append('title', data.title);
      formData.append('link', data.link);

      return await patchNews(data.id, formData);
    },
    onSuccess: (_, data) => {
      queryClient.invalidateQueries({
        queryKey: ['admin'],
      });
      queryClient.invalidateQueries({
        queryKey: ['admin', 'news', data.id],
      });

      open(EDIT_TOAST_OPTION.success);
    },
    onError: (error) => {
      console.error('[useEditNewsMutation] 최신소식 수정 실패', error);
      open(EDIT_TOAST_OPTION.error);
    },
  });
};

export const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: (id: number) => deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin'],
      });

      open(DELETE_TOAST_OPTION.success);
    },
    onError: () => {
      open(DELETE_TOAST_OPTION.error);
    },
  });
};

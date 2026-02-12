import { type ToastOptionType, useToast } from '@sopt-makers/ui';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  deleteNews,
  getAdminInfo,
  getPresignedUrl,
  postNewsV2,
  uploadToS3,
} from '@/components/org/OrgAdmin/HomeSection/api';

const TOAST_OPTION: Record<'success' | 'error', ToastOptionType> = {
  success: { icon: 'success', content: '성공적으로 추가되었어요' },
  error: { icon: 'error', content: '추가에 실패했어요' },
};

export const useAdminInfoQuery = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: getAdminInfo,
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

export const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();
  const option: ToastOptionType = {
    icon: 'success',
    content: '성공적으로 삭제되었어요.',
  };

  return useMutation({
    mutationFn: (id: number) => deleteNews(id),
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

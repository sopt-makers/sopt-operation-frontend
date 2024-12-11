import { type ToastOptionType, useToast } from '@sopt-makers/ui';
import { useMutation, useQuery, useQueryClient } from 'react-query';

import {
  deleteNews,
  getAdminInfo,
  postNews,
} from '@/components/org/OrgAdmin/HomeSection/api';

export const useAdminInfoQuery = () => {
  return useQuery({
    queryKey: ['admin'],
    queryFn: getAdminInfo,
  });
};

export const useAddNewsMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();
  const option: ToastOptionType = {
    icon: 'success',
    content: '성공적으로 추가되었어요.',
  };

  return useMutation({
    mutationFn: (formData: FormData) => postNews(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin'],
      });

      open(option);
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

      open(option);
    },
  });
};

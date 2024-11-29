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
  return useMutation({
    mutationFn: (formData: FormData) => postNews(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin'],
      });
    },
  });
};

export const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteNews(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['admin'],
      });
    },
  });
};

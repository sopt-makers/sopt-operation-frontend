import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { formClient } from '@/services/api/client';

export const useGetAboutSopt = (generation: number, authHeader: AuthHeader) => {
  const queryFn = async () => {
    try {
      const { data }: AxiosResponse<AboutSopt> = await formClient.get(
        `/aboutSopt/admin/generation/${generation}`,
        {
          headers: { ...authHeader },
        },
      );
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery<AboutSopt, AxiosError, AboutSopt>(
    ['getAboutSopt', generation, authHeader],
    queryFn,
  );
};

export const useUpdateAboutSopt = (
  generation: number,
  aboutSopt: AboutSopt,
  authHeader: AuthHeader,
) => {
  return useMutation('updateAboutSopt', {
    mutationFn: async (aboutSopt: AboutSopt): Promise<AboutSopt> => {
      const { data }: AxiosResponse<AboutSopt> = await formClient.put(
        `/aboutSopt/admin/generation/${generation}`,
        aboutSopt,
        {
          headers: { ...authHeader },
        },
      );
      return data;
    },
    onError: (error: AxiosError) => {
      alert(error.message);
    },
    onSuccess: (args: AboutSopt) => {
      console.log('onSuccess', args);
    },
  });
};

export const usePublishAboutSopt = (
  generation: number,
  authHeader: AuthHeader,
) => {
  return useMutation('publishAboutSopt', {
    mutationFn: async (generation: number): Promise<AboutSopt> => {
      const { data }: AxiosResponse<AboutSopt> = await formClient.post(
        `/aboutSopt/admin/generation/${generation}/publish`,
        {},
        {
          headers: { ...authHeader },
        },
      );
      return data;
    },
    onSuccess: (aboutSopt: AboutSopt) => {
      if (aboutSopt.isPublished) {
        alert('공식 홈페이지에 노출 되었어요.');
      } else {
        alert('공식 홈페이지에서 숨겨졌어요');
      }
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        alert('입력이 되지 않은 필드가 있으면 공홈에 노출 할 수 없어요.');
      }
      if (error?.response?.status === 500) {
        alert('서버에러');
      }
    },
  });
};

import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { orgClient } from '@/services/api/client';

export const useGetAboutSopt = (generation: number, authHeader: AuthHeader) => {
  const queryFn = async () => {
    try {
      const { data }: AxiosResponse<AboutSopt> = await orgClient.get(
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
      const { data }: AxiosResponse<AboutSopt> = await orgClient.put(
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
      const { data }: AxiosResponse<AboutSopt> = await orgClient.post(
        `/aboutSopt/admin/generation/${generation}/publish`,
        {},
        {
          headers: { ...authHeader },
        },
      );
      return data;
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 400) {
        alert('빈값이 있으면 공홈에 노출 할 수 없어요.');
      }
      if (error?.response?.status === 500) {
        alert('서버에러');
      }
    },
  });
};

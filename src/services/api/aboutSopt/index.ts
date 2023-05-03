import { AxiosError, AxiosResponse } from 'axios';
import { useMutation, useQuery } from 'react-query';

import { orgClient } from '@/services/api/client';

export const useGetAboutSopt = (semester: number, authHeader: AuthHeader) => {
  const queryFn = async () => {
    try {
      const { data }: AxiosResponse<AboutSopt> = await orgClient.get(
        `/aboutSopt/admin/semester/${semester}`,
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
    ['getAboutSopt', semester, authHeader],
    queryFn,
  );
};

export const useUpdateAboutSopt = (
  semester: number,
  aboutSopt: AboutSopt,
  authHeader: AuthHeader,
) => {
  // const mutationFn = async (aboutSopt: AboutSopt): Promise<AboutSopt> => {
  //   const { data } = await orgClient.put<AboutSopt, AboutSopt>(
  //     `/aboutSopt/admin/semester/${semester}`,
  //     aboutSopt,
  //     {
  //       headers: { ...authHeader },
  //     },
  //   );
  //   return data;
  // };
  return useMutation('updateAboutSopt', {
    mutationFn: async (aboutSopt: AboutSopt): Promise<AboutSopt> => {
      const { data }: AxiosResponse<AboutSopt> = await orgClient.put(
        `/aboutSopt/admin/semester/${semester}`,
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

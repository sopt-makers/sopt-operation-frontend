import { useMutation, useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
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
      console.log(data);
      return data;
    } catch (error) {
      throw error;
    }
  };

  return useQuery(['aboutSopt', semester, authHeader], queryFn);
};

export const useUpdateAboutSopt = (
  semester: number,
  aboutSopt: AboutSopt,
  authHeader: AuthHeader,
) => {
  const mutationFn = async (aboutSopt) => {
    const { data }: AxiosResponse<AboutSopt, AboutSopt> = await orgClient.put<
      AboutSopt,
      AboutSopt
    >(`/aboutSopt/admin/semester/${semester}`, aboutSopt, {
      headers: { ...authHeader },
    });
    return data;
  };
  useMutation({
    mutationFn,
    onError: (error: AxiosError) => {
      alert(error.message);
    },
  });
};

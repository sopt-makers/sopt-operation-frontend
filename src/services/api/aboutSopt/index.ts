import { useQuery } from 'react-query';
import { AxiosResponse } from 'axios';
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

export const usePut;

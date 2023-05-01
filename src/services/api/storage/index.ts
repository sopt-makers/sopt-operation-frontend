import { useQuery } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { orgClient } from '@/services/api/client';

export const useGetPresignedUrl = (authHeader: AuthHeader) => {
  return useQuery<ResponsePresignedUrl, AxiosError>(
    'presignedUrl',
    async () => {
      try {
        const { data }: AxiosResponse<ResponsePresignedUrl> =
          await orgClient.get('/file/presigned-url', {
            headers: { ...authHeader },
          });
        return data;
      } catch (error) {
        throw error;
      }
    },
  );
};

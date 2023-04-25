import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { client } from '@/services/api/client';

export const useGetMemberList = (
  generation: number,
  part: string,
  authHeader: AuthHeader,
) => {
  return useQuery<Member[], Error>(
    ['memberList', generation, part, authHeader],
    async () => {
      try {
        const { data }: AxiosResponse<{ data: Member[] }> = await client.get(
          `/members/list?generation=${generation}&part=${part}`,
          {
            headers: { ...authHeader },
          },
        );
        return data.data;
      } catch (error) {
        throw error;
      }
    },
  );
};

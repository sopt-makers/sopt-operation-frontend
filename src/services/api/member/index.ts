import { AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { client } from '@/services/api/client';

export const useGetMemberList = (
  generation: number,
  part: string,
  authHeader: AuthHeader,
) => {
  return useQuery<ScoreMember[], Error>(
    ['memberList', generation, part, authHeader],
    async () => {
      try {
        const { data }: AxiosResponse<{ data: ScoreMember[] }> =
          await client.get(
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

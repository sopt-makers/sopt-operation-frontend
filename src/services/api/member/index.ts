import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { client } from '@/services/api/client';

export const useGetMemberList = (
  generation: number,
  part: string,
  authHeader: AuthHeader,
) => {
  return useQuery<ScoreMember[], ProjectError>(
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
        if (error instanceof AxiosError) {
          switch (error.response?.status) {
            case 400:
              throw {
                status: 400,
                error: '세션 정보를 불러오는데 실패했어요',
              };
            case 401:
            case 402:
            case 403:
              throw {
                status: 403,
                error: '만료된 토큰입니다. 다시 로그인 해주세요.',
              };
            case 404:
            case 500:
            default:
              throw {
                status: 500,
                error: '알 수 없는 에러예요',
              };
          }
        } else {
          throw { status: 999, error: '알 수 없는 에러예요' };
        }
      }
    },
    { staleTime: 10 * 60 * 1000 },
  );
};

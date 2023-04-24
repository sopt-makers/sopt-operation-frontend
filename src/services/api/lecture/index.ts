import { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from 'react-query';

import { client } from '@/services/api/client';

export const postNewSession = async (
  sessionData: SessionBase,
  authHeader: AuthHeader,
): Promise<void> => {
  try {
    await client.post('/lectures', sessionData, { headers: { ...authHeader } });
  } catch (e) {
    console.error('Error posting new session:', e);
  }
};

export const useGetSessionList = (
  generation: number,
  part: string,
  authHeader: AuthHeader,
) => {
  return useQuery(
    ['sessionList', generation, part, authHeader],
    async (): Promise<Lecture | ProjectError> => {
      try {
        const { data }: AxiosResponse<{ data: Lecture }> = await client.get(
          `/lectures?generation=${generation}&part=${part}`,
          {
            headers: { ...authHeader },
          },
        );
        return data.data;
      } catch (e) {
        switch (e.response?.status) {
          case 400:
            throw {
              status: 400,
              error: '세션 정보를 불러오는데 실패했어요',
            };
          case 401:
          case 402:
          case 403:
            throw { status: 403, error: '세션 정보 조회 권한이 없어요' };
          case 404:
          case 500:
          default:
            throw { status: 500, error: '알 수 없는 에러예요' };
        }
      }
    },
  );
};

export const getSessionDetail = async (
  lectureId: number,
  authHeader: AuthHeader,
): Promise<SessionDetail | ProjectError> => {
  try {
    const { data }: AxiosResponse<{ data: SessionDetail }> = await client.get(
      `/lectures/${lectureId}`,
      { headers: { ...authHeader } },
    );
    return data.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 400:
          return {
            status: 400,
            error: '세션 정보를 불러오는데 실패했어요',
          };
        case 401:
        case 402:
        case 403:
          return { status: 403, error: '세션 정보 조회 권한이 없어요' };
        case 404:
        case 500:
        default:
          return { status: 500, error: '알 수 없는 에러예요' };
      }
    } else {
      return { status: 999, error: '알 수 없는 에러예요' };
    }
  }
};

export const getSessionMembers = async (
  lectureId: number,
  authHeader: AuthHeader,
  part?: PART,
): Promise<Member[] | ProjectError> => {
  try {
    const { data }: AxiosResponse<{ data: Member[] }> = await client.get(
      `/attendances/lecture/${lectureId}${part ? `?part=${part}` : ''}`,
      { headers: { ...authHeader } },
    );
    return data.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 400:
          return {
            status: 400,
            error: '회원 정보를 불러오는데 실패했어요',
          };
        case 401:
        case 402:
        case 403:
          return { status: 403, error: '회원 정보 조회 권한이 없어요' };
        case 404:
        case 500:
        default:
          return { status: 500, error: '알 수 없는 에러예요' };
      }
    } else {
      return { status: 999, error: '알 수 없는 에러예요' };
    }
  }
};

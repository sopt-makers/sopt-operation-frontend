import { AxiosError, AxiosResponse } from 'axios';

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

export const getSessionList = async (
  generation: number,
  authHeader: AuthHeader,
): Promise<LectureImsy | null> => {
  try {
    const { data }: AxiosResponse<LectureImsy> = await client.get(
      `/lectures?generation=${generation}`,
      { headers: { ...authHeader } },
    );
    return data;
  } catch (e) {
    return null;
  }
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

export const startAttendance = async (
  code: string,
  lectureId: number,
  round: number,
  authHeader: AuthHeader,
): Promise<boolean> => {
  try {
    await client.patch(
      '/lectures/attendance',
      { code, lectureId, round },
      { headers: { ...authHeader } },
    );
    return true;
  } catch (e) {
    return false;
  }
};

export const updateAttendance = async (
  lectureId: number,
  authHeader: AuthHeader,
): Promise<boolean> => {
  try {
    await client.patch(
      `/lectures/${lectureId}`,
      {},
      { headers: { ...authHeader } },
    );
    return true;
  } catch (e) {
    return false;
  }
};

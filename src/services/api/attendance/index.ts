import { AxiosError, AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const updateMemberAttendStatus = async (
  subAttendanceId: number,
  status: ATTEND_STATUS,
  attribute: SESSION_TYPE,
  authHeader: AuthHeader,
): Promise<void | ProjectError> => {
  try {
    await client.patch(
      '/attendances',
      { subAttendanceId, status, attribute },
      { headers: { ...authHeader } },
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 400:
          return { status: 400, error: '출석 상태를 변경하는데 실패했어요' };
        case 401:
        case 402:
        case 403:
          return { status: 403, error: '출석 상태 변경 권한이 없어요' };
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

export const updateMemberScore = async (
  memberId: number,
  authHeader: AuthHeader,
): Promise<void | ProjectError> => {
  try {
    await client.patch(
      `/attendances/member/${memberId}`,
      {},
      { headers: { ...authHeader } },
    );
  } catch (e) {
    if (e instanceof AxiosError) {
      switch (e.response?.status) {
        case 400:
          return { status: 400, error: '출석 상태를 갱신하는데 실패했어요' };
        case 401:
        case 402:
        case 403:
          return { status: 403, error: '출석 상태 갱신 권한이 없어요' };
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

export const getMemberAttendance = async (
  memberId: number,
  authHeader: AuthHeader,
): Promise<ScoreMemberDetail | null> => {
  try {
    const { data }: AxiosResponse<{ data: ScoreMemberDetail }> =
      await client.get(`/attendances/${memberId}`, {
        headers: { ...authHeader },
      });
    return data.data;
  } catch (e) {
    return null;
  }
};

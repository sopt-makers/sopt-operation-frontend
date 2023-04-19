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
      return e.response?.data;
    } else {
      return { status: 999, error: 'Unknown Error' };
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
      return e.response?.data;
    } else {
      return { status: 999, error: 'Unknown Error' };
    }
  }
};

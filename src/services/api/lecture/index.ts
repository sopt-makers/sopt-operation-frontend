import { AxiosError, AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

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
      return e.response?.data;
    } else {
      return { status: 999, error: 'Unknown Error' };
    }
  }
};

export const getSessionMembers = async (
  lectureId: number,
  authHeader: AuthHeader,
): Promise<Member[] | ProjectError> => {
  try {
    const { data }: AxiosResponse<{ data: Member[] }> = await client.get(
      `/attendances/lecture/${lectureId}`,
      { headers: { ...authHeader } },
    );
    return data.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      return e.response?.data;
    } else {
      return { status: 999, error: 'Unknown Error' };
    }
  }
};

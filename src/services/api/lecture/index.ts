import { AxiosError, AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const getSessionDetail = async (
  lectureId: number,
  part: PART,
  authHeader: AuthHeader,
): Promise<SessionDetail | ProjectError> => {
  try {
    const { data }: AxiosResponse<{ data: SessionDetail }> = await client.get(
      `/lectures/${lectureId}?part=${part}`,
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

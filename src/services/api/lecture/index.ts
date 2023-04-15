import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const postNewSession = async (
  sessionData: SessionBase,
  authHeader: AuthHeader,
): Promise<SessionBase | null> => {
  try {
    const { data }: AxiosResponse<SessionBase> = await client.post(
      '/lectures',
      sessionData,
      { headers: { ...authHeader } },
    );
    return data;
  } catch (e) {
    return null;
  }
};

export const getSessionDetail = async (
  lectureId: number,
  part: PART,
  authHeader: AuthHeader,
): Promise<SessionDetail | null> => {
  try {
    const { data }: AxiosResponse<SessionDetail> = await client.get(
      `/lectures/${lectureId}?part=${part}`,
      { headers: { ...authHeader } },
    );
    return data;
  } catch (e) {
    return null;
  }
};

import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

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

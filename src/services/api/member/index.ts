import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const getMemberList = async (
  generation: number,
  part: string,
  authHeader: AuthHeader,
): Promise<Member | null> => {
  try {
    const { data }: AxiosResponse<Member> = await client.get(
      `/members/list?generation=${generation}&part=${part}`,
      { headers: { ...authHeader } },
    );
    return data;
  } catch (e) {
    return null;
  }
};

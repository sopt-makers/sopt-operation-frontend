import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const getMemberList = async (generation: number, part: PART) => {
  const { data }: AxiosResponse<{ data: ScoreMember[] }> = await client.get(
    `/members/list?generation=${generation}&part=${part}`,
  );
  return data.data;
};

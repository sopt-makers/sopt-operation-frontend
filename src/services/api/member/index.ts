import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';
import { buildQuery } from '@/utils';

export const getMemberList = async (
  page: number,
  generation: number,
  part: PART,
) => {
  const query = buildQuery({
    part,
    generation: `${generation}`,
    page: `${page}`,
  });
  const {
    data,
  }: AxiosResponse<{ data: { members: ScoreMember[]; totalCount: number } }> =
    await client.get(`/members/list${query}`);
  return data.data;
};

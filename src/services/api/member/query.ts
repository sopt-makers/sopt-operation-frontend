import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';

import { PAGE_SIZE } from '@/data/queryData';

import { getMemberList } from './index';

export const useGetInfiniteMemberList = (
  generation: number,
  part: PART,
): UseInfiniteQueryResult<{ members: ScoreMember[]; totalCount: number }> => {
  return useInfiniteQuery(
    ['memberList', generation, part],
    async ({ pageParam = 0 }) =>
      pageParam !== null && (await getMemberList(pageParam, generation, part)),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage && lastPage.members.length < PAGE_SIZE ? null : pages.length,
    },
  );
};

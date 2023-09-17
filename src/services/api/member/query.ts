import { useInfiniteQuery } from 'react-query';

import { PAGE_SIZE } from '@/data/queryData';

import { getMemberList } from './index';

export const useGetInfiniteMemberList = (generation: number, part: PART) => {
  return useInfiniteQuery(
    ['memberList', generation, part],
    async ({ pageParam = 0 }) =>
      await getMemberList(pageParam, generation, part),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length < PAGE_SIZE) {
          return null;
        }
        return pages.length;
      },
    },
  );
};

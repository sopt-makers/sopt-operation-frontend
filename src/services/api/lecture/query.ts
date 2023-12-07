import {
  useInfiniteQuery,
  UseInfiniteQueryResult,
  useQuery,
} from 'react-query';

import { PAGE_SIZE } from '@/data/queryData';

import {
  getLectureDetail,
  getSessionDetail,
  getSessionList,
  getSessionMembers,
} from './index';

export const useGetSessionList = (generation: number, part: string) => {
  return useQuery<Lecture, Error>(
    ['sessionList', generation, part],
    () => getSessionList(generation, part),
    { staleTime: 10 * 60 * 1000 },
  );
};

export const useGetLectureDetail = (lectureId: number) => {
  return useQuery<LectureDetail, Error>(
    ['lectureDetail', lectureId],
    () => getLectureDetail(lectureId),
    { staleTime: 10 * 60 * 1000 },
  );
};

export const useGetSessionDetail = (lectureId: number | null) => {
  return useQuery<SessionDetail | null, Error>(
    ['sessionDetail', lectureId],
    () => (lectureId ? getSessionDetail(lectureId) : null),
    { staleTime: 10 * 60 * 1000 },
  );
};

export const useGetInfiniteSessionMembers = (
  lectureId: number | null,
  part?: PART,
): UseInfiniteQueryResult<{
  attendances: SessionMember[];
  totalCount: number;
}> => {
  return useInfiniteQuery(
    ['sessionMembers', lectureId, part],
    async ({ pageParam = 0 }) =>
      pageParam !== null &&
      (await getSessionMembers(pageParam, lectureId ?? 0, part)),
    {
      getNextPageParam: (lastPage, pages) =>
        lastPage && lastPage.attendances.length < PAGE_SIZE
          ? null
          : pages.length,
    },
  );
};

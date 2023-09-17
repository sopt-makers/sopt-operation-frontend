import { useQuery } from 'react-query';

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

export const useGetSessionMembers = (lectureId: number | null, part?: PART) => {
  return useQuery<SessionMember[] | null, Error>(
    ['sessionMembers', lectureId, part],
    () => (lectureId ? getSessionMembers(lectureId, part) : null),
    { staleTime: 10 * 60 * 1000 },
  );
};

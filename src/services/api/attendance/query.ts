import { useQuery } from 'react-query';

import { getMemberAttendance } from './index';

export const useGetMemberAttendance = (memberId: number) => {
  return useQuery<ScoreMemberDetail, Error>(
    ['memberAttendance', memberId],
    () => getMemberAttendance(memberId),
    { staleTime: 10 * 60 * 1000 },
  );
};

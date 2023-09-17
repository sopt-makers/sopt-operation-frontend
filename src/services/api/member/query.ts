import { useQuery } from 'react-query';

import { getMemberList } from './index';

export const useGetMemberList = (generation: number, part: PART) => {
  return useQuery<ScoreMember[], Error>(
    ['memberList', generation, part],
    () => getMemberList(generation, part),
    { staleTime: 10 * 60 * 1000 },
  );
};

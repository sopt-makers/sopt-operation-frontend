import { useQuery } from 'react-query';

import { getAlarmList } from './index';

export const useGetAlarmList = (generation: number) => {
  return useQuery<Alarm[], Error>(
    ['alarmList', generation],
    () => getAlarmList(generation),
    { staleTime: 10 * 60 * 1000 },
  );
};

import { useQuery } from 'react-query';

import { getAlarm, getAlarmList } from './index';

export const useGetAlarmList = (generation: number) => {
  return useQuery<Alarm[], Error>(
    ['alarmList', generation],
    () => getAlarmList(generation),
    { staleTime: 10 * 60 * 1000 },
  );
};

export const useGetAlarm = (alarmId: number) => {
  return useQuery<AlarmDetail, Error>(
    ['alarm', alarmId],
    () => getAlarm(alarmId),
    { staleTime: 10 * 60 * 1000 },
  );
};

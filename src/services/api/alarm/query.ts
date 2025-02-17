import { useQuery } from 'react-query';

import { AlarmListResponse, getAlarm, getAlarmList } from './index';

export const useGetAlarmList = (generation: number, status: ALARM_STATUS) => {
  return useQuery<AlarmListResponse, Error>(
    ['alarmList', generation, status],
    () => getAlarmList(generation, status),
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

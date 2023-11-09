import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const postNewAlarm = async (alarmData: PostAlarmData): Promise<void> => {
  await client.post('/alarms', alarmData);
};

export const getAlarmList = async (generation: number): Promise<Alarm[]> => {
  const { data }: AxiosResponse<{ data: { alarms: Alarm[] } }> =
    await client.get(
      `/alarms?generation=${generation}`, // TODO:: 페이지네이션 적용
    );

  return data.data.alarms;
};

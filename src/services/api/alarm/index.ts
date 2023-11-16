import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const postNewAlarm = async (alarmData: PostAlarmData): Promise<void> => {
  await client.post('/alarms', alarmData);
};

export const getAlarmList = async (generation: number): Promise<Alarm[]> => {
  const { data }: AxiosResponse<{ data: { alarms: Alarm[] } }> =
    await client.get(
      `/alarms?generation=${generation}&size=${100}`, // TODO:: 페이지네이션 적용
    );

  return data.data.alarms;
};

export const sendAlarm = async (alarmId: number): Promise<boolean> => {
  const { data }: AxiosResponse<{ data: { success: boolean } }> =
    await client.post('/alarms/send', { alarmId });
  return data.data.success;
};

export const getAlarm = async (alarmId: number): Promise<AlarmDetail> => {
  const { data }: AxiosResponse<{ data: AlarmDetail }> = await client.get(
    `/alarms/${alarmId}`,
  );
  return data.data;
};

export const deleteAlarm = async (alarmId: number): Promise<boolean> => {
  const { data }: AxiosResponse<{ success: boolean }> = await client.delete(
    `/alarms/${alarmId}`,
  );
  return data.success;
};

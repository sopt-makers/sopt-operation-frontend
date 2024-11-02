import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const getAlarmList = async (generation: number): Promise<Alarm[]> => {
  const { data }: AxiosResponse<{ data: { alarms: Alarm[] } }> =
    await client.get(
      `/alarms?generation=${generation}&size=${100}`, // TODO:: 페이지네이션 적용
    );

  return data.data.alarms;
};

export const sendAlarm = async (alarmData: AlarmData): Promise<any> => {
  const { data }: AxiosResponse<any> = await client.post(
    '/alarms/send',
    alarmData,
  );
  return data;
};

export const createReserveAlarm = async (
  alarmData: ReserveAlarmData,
): Promise<any> => {
  const { data }: AxiosResponse<any> = await client.post(
    '/alarms/schedule',
    alarmData,
  );

  return data;
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

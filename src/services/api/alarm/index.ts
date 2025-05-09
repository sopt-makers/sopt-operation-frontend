import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export interface AlarmListResponse {
  alarms: Alarm[];
  totalCount: number;
}

export const postNewAlarm = async (alarmData: PostAlarmData): Promise<void> => {
  await client.post('/alarms', alarmData);
};

export const getAlarmList = async (
  generation: number,
  status: ALARM_STATUS,
): Promise<AlarmListResponse> => {
  const statusQuery = status === 'ALL' ? '' : `&status=${status}`;
  const pageQuery = `&size=${100}`; // TODO:: 페이지네이션 적용

  const { data }: AxiosResponse<{ data: AlarmListResponse }> = await client.get(
    `/alarms?generation=${generation}${statusQuery}${pageQuery}`,
  );

  return data.data;
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

export const deleteAlarm = async (alarmId: number): Promise<void> => {
  await client.delete(`/alarms/${alarmId}`);
};

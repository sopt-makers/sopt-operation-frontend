import { client } from '@/services/api/client';

export const postNewAlarm = async (alarmData: PostAlarmData): Promise<void> => {
  await client.post('/alarms', alarmData);
};

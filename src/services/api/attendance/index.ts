import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const updateMemberAttendStatus = async (
  subAttendanceId: number,
  status: ATTEND_STATUS,
): Promise<void> => {
  await client.patch('/attendances', { subAttendanceId, status });
};

export const updateMemberScore = async (memberId: number): Promise<void> => {
  await client.patch(`/attendances/member/${memberId}`, {});
};

export const getMemberAttendance = async (memberId: number) => {
  const { data }: AxiosResponse<{ data: ScoreMemberDetail }> = await client.get(
    `/attendances/${memberId}`,
  );
  return data.data;
};

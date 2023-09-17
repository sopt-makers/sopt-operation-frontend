import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const updateMemberAttendStatus = async (
  subAttendanceId: number,
  status: ATTEND_STATUS,
  attribute: SESSION_TYPE,
): Promise<void | ProjectError> => {
  try {
    await client.patch('/attendances', { subAttendanceId, status, attribute });
  } catch (e) {
    console.error(e);
  }
};

export const updateMemberScore = async (
  memberId: number,
): Promise<void | ProjectError> => {
  try {
    await client.patch(`/attendances/member/${memberId}`, {});
  } catch (e) {
    console.error(e);
  }
};

export const getMemberAttendance = async (memberId: number) => {
  const { data }: AxiosResponse<{ data: ScoreMemberDetail }> = await client.get(
    `/attendances/${memberId}`,
  );
  return data.data;
};

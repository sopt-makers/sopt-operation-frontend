import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const postNewSession = async (
  sessionData: SessionBase,
): Promise<void> => {
  await client.post('/lectures', sessionData);
};

export const deleteSession = async (lectureId: number) => {
  const res = await client.delete(`/lectures/${lectureId}`);
  return res;
};

export const startAttendance = async (
  code: string,
  lectureId: number,
  round: number,
): Promise<boolean> => {
  await client.patch('/lectures/attendance', { code, lectureId, round });
  return true;
};

export const updateAttendance = async (lectureId: number): Promise<boolean> => {
  await client.patch(`/lectures/${lectureId}`, {});
  return true;
};

export const getSessionList = async (
  generation: number,
  part: string,
): Promise<Lecture> => {
  const { data }: AxiosResponse<{ data: Lecture }> = await client.get(
    `/lectures?generation=${generation}&part=${part}`,
  );
  return data.data;
};

export const getLectureDetail = async (lectureId: number) => {
  const { data }: AxiosResponse<{ data: LectureDetail }> = await client.get(
    `/lectures/detail/${lectureId}`,
  );
  return data.data;
};

export const getSessionDetail = async (lectureId: number) => {
  const { data }: AxiosResponse<{ data: SessionDetail }> = await client.get(
    `/lectures/${lectureId}`,
  );
  return data.data;
};

export const getSessionMembers = async (lectureId: number, part?: PART) => {
  const { data }: AxiosResponse<{ data: SessionMember[] }> = await client.get(
    `/attendances/lecture/${lectureId}${part ? `?part=${part}` : ''}`,
  );
  return data.data;
};

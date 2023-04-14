import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';

export const getUserInfo = async (): Promise<User | null> => {
  try {
    const { data }: AxiosResponse<User> = await client.get('/user', {
      headers: {},
    });
    return data;
  } catch (e) {
    return null;
  }
};
export const getSessionList = async (): Promise<Lecture | null> => {
  try {
    const { data }: AxiosResponse<Lecture> = await client.get(
      `/api/v1/lectures?generation=${32}`,
      { headers: {} },
    );
    return data;
  } catch (e) {
    return null;
  }
};

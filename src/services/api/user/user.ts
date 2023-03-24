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

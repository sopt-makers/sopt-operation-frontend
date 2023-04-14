import { AxiosResponse } from 'axios';

import { client } from '@/services/api/client';
import { setToken } from '@/utils/auth';

export const userLogin = async (
  loginData: LoginData,
): Promise<User | string> => {
  try {
    const { data }: AxiosResponse<LoginRes> = await client.post(
      '/auth/login',
      loginData,
    );
    const { accessToken, ...user } = data;
    setToken('ACCESS', accessToken);

    return user;
  } catch (e) {
    console.log(e);
    return '';
  }
};

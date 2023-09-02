import { AxiosError, AxiosResponse } from 'axios';

import { client } from '@/services/api/client';
import { setToken } from '@/utils/auth';

export const userLogin = async (
  loginData: LoginData,
): Promise<User | LoginError> => {
  try {
    const { data }: AxiosResponse<{ data: LoginRes }> = await client.post(
      '/auth/login',
      loginData,
    );
    const { accessToken, ...user } = data.data;
    setToken('ACCESS', accessToken);

    return user;
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        success: false,
        message: '아이디 혹은 비밀번호가 일치하지 않아요',
      };
    } else {
      return { success: false, message: '알 수 없는 에러예요' };
    }
  }
};

export const reissueAccessToken = async (): Promise<void | LoginError> => {
  try {
    const { data }: AxiosResponse<{ data: string }> = await client.patch(
      '/auth/refresh',
    );
    const accessToken = data.data;
    setToken('ACCESS', accessToken);
  } catch (e) {
    return { success: false, message: '알 수 없는 에러예요' };
  }
};

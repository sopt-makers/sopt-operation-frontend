import { AxiosError, AxiosResponse } from 'axios';

import { client } from '@/services/api/client';
import { setToken } from '@/utils/auth';

export const userLogin = async (
  loginData: LoginData,
): Promise<User | LoginError> => {
  try {
    const { data }: AxiosResponse<LoginRes> = await client.post(
      '/auth/login',
      loginData,
    );
    const { accessToken, ...user } = data;
    setToken('ACCESS', accessToken);

    return user;
  } catch (e) {
    if (e instanceof AxiosError) {
      return {
        success: false,
        message: '존재하지 않는 이메일이거나, 잘못된 비밀번호예요',
      };
    } else {
      return { success: false, message: '알 수 없는 에러예요' };
    }
  }
};

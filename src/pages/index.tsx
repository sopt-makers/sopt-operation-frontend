import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import useInput from '@/hooks/useInput';
import { userLogin } from '@/services/api/auth';
import { user as userState } from '@/store/globalStore';
import { getToken } from '@/utils/auth';

function LoginPage() {
  const router = useRouter();

  const setUser = useSetRecoilState(userState);

  const { state, onChange } = useInput<LoginData>({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (getToken('ACCESS')) {
      router.replace('/attendanceAdmin/session');
    }
  }, []);

  const onSubmit = async () => {
    if (state.email && state.password) {
      const result = await userLogin(state);

      if ('success' in result) {
        alert(result.message);
      } else {
        setUser(result);
        router.replace('/attendanceAdmin/session');
      }
    }
  };

  return (
    <>
      <Head>
        <title>SOPT Admin :: 로그인</title>
        <meta name="description" content="SOPT Operation Service" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledLogin>
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
        />
        <Button type="submit" text="로그인" onClick={onSubmit} />
      </StyledLogin>
    </>
  );
}

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default LoginPage;

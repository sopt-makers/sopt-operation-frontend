import styled from '@emotion/styled';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  useEffect(() => {
    if (getToken('ACCESS')) {
      router.replace('/attendanceAdmin/session');
    }
  }, []);

  const onSubmit = async () => {
    if (state.email && state.password) {
      setIsLoading(true);
      const result = await userLogin(state);
      setIsLoading(false);

      if ('success' in result) {
        setError({ status: true, message: result.message });
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
        <h1>
          <strong>SOPT</strong> web admin
        </h1>
        <div>
          <label htmlFor="login-email">아이디</label>
          <input
            id="login-email"
            type="email"
            name="email"
            value={state.email}
            onChange={onChange}
            placeholder="이메일을 입력해주세요"
          />
        </div>
        <div>
          <label htmlFor="login-password">비밀번호</label>
          <input
            id="login-password"
            type="password"
            name="password"
            value={state.password}
            onChange={onChange}
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
        <Button type="submit" text="로그인" onClick={onSubmit} />
        <p className="error-message">{error.message}</p>
      </StyledLogin>
      {isLoading && <Loading />}
    </>
  );
}

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 90vh;
  h1 {
    font-size: 3.6rem;
    line-height: 3.6rem;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.grayscale.black60};
    margin-bottom: 6rem;
  }
  strong {
    font-weight: 700;
  }
  & > div {
    display: flex;
    flex-direction: column;
  }
  label {
    font-size: 1.4rem;
    font-weight: 500;
    line-height: 2rem;
    color: ${({ theme }) => theme.color.grayscale.gray100};
    margin-bottom: 0.6rem;
  }
  input {
    width: 40rem;
    height: 4.4rem;
    border-radius: 0.8rem;
    border: 1px solid ${({ theme }) => theme.color.grayscale.gray30};
    margin-bottom: 4rem;
    padding: 1rem 1.4rem;
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2.4rem;
    color: ${({ theme }) => theme.color.grayscale.black40};
    &::placeholder {
      color: ${({ theme }) => theme.color.grayscale.gray40};
    }
    &:focus {
      outline: 1px solid ${({ theme }) => theme.color.grayscale.black40};
    }
  }
  button {
    width: 40rem;
    height: 5.6rem;
    border-radius: 1rem;
    font-size: 1.8rem;
    font-weight: 700;
  }
  .error-message {
    font-size: 1.6rem;
    font-weight: 500;
    line-height: 2rem;
    height: 2rem;
    color: ${({ theme }) => theme.color.sub.red};
    margin-top: 2.4rem;
  }
`;

export default LoginPage;

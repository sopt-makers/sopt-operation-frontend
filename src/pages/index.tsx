import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';

import { SoptMainLogo } from '@/assets/icons/SoptLogos';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import { adminStatusContext } from '@/components/devTools/AdminContextProvider';
import useInput from '@/hooks/useInput';
import { userLogin } from '@/services/api/auth';
import { user as userState } from '@/store/globalStore';
import { getToken } from '@/utils/auth';

function LoginPage() {
  const router = useRouter();

  const setUser = useSetRecoilState(userState);
  const { status, setStatus } = useContext(adminStatusContext);

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
        setStatus(result.adminStatus);
        sessionStorage.setItem('adminStatus', result.adminStatus);
        router.replace(
          result.adminStatus !== 'MAKERS'
            ? '/attendanceAdmin/session'
            : '/alarmAdmin',
        );
      }
    }
  };

  return (
    <>
      <Head>
        <title>
          {process.env.NODE_ENV === 'development' ? '[DEV]' : ''} SOPT Admin ::
          로그인
        </title>
      </Head>
      <StyledLogin>
        <h1>
          <SoptMainLogo /> web admin
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
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.7rem;

    ${fontsObject.LABEL_1_18_SB}
    color: ${colors.white};

    margin-bottom: 3.1rem;
  }
  strong {
    font-weight: 700;
  }
  & > div {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-top: 1.6rem;
    margin-bottom: 0.6rem;

    ${fontsObject.LABEL_3_14_SB}

    color: ${colors.gray300};
  }
  input {
    width: 40.2rem;
    height: 4.4rem;

    padding: 1rem 1.4rem;

    ${fontsObject.LABEL_1_18_SB}

    color: ${colors.gray10};
    background-color: ${colors.gray700};
    border: none;
    outline: none;

    border-radius: 0.8rem;

    &::placeholder {
      color: ${colors.gray400};
    }

    &:focus {
      background-color: ${colors.gray600};
      outline: 0.1rem solid ${colors.gray300};
    }
  }
  button {
    width: 40rem;
    height: 5.6rem;

    margin-top: 4rem;
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

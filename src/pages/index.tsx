import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import Head from 'next/head';
import { useRecoilState } from 'recoil';

import Example from '@/components/example/Example';
import { user as userState } from '@/store/globalStore';

export default function Home() {
  const theme = useTheme();

  const [user, setUser] = useRecoilState(userState);

  console.log('theme color : ', theme.color.main);
  console.log('user : ', user);

  return (
    <StyledRoot>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>웹 어드민 렛츠고.</h1>
      <Example />
    </StyledRoot>
  );
}

const StyledRoot = styled.div`
  padding-left: 22rem;
  h1 {
    color: ${({ theme }) => theme.color.main.purple100};
  }
`;

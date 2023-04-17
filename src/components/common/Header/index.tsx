import { useRouter } from 'next/router';

import { IcGoPrev } from '@/assets/icons';
import { destroyToken } from '@/utils/auth';

import { StHeader } from './style';

function Header() {
  const router = useRouter();

  const logout = () => {
    destroyToken('ACCESS');
    router.replace('/');
  };

  return (
    <StHeader>
      <button onClick={() => router.back()}>
        <IcGoPrev />
        <p>이전</p>
      </button>
      <button className="logout" onClick={logout}>
        <p>로그아웃</p>
      </button>
    </StHeader>
  );
}

export default Header;

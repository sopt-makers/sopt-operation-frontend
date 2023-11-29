import { useRouter } from 'next/router';

import AdminStatusDevtools from '@/components/devTools/AdminStatus';
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
      <div className="status_devtools">
        <AdminStatusDevtools />
      </div>
      <button onClick={logout}>
        <p>로그아웃</p>
      </button>
    </StHeader>
  );
}

export default Header;

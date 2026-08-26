import { useRouter } from 'next/router';

import AdminStatusDevtools from '@/components/devTools/AdminStatus';
import { IS_PRODUCTION } from '@/configs/config';

import { StHeader } from './style';

function Header() {
  const router = useRouter();

  const logout = () => {
    sessionStorage.clear();
    router.replace('/');
  };

  return (
    <StHeader>
      {!IS_PRODUCTION && (
        <div className="status_devtools">
          <AdminStatusDevtools />
        </div>
      )}

      <button onClick={logout}>
        <p>로그아웃</p>
      </button>
    </StHeader>
  );
}

export default Header;

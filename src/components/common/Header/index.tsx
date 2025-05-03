import { useRouter } from 'next/router';

import AdminStatusDevtools from '@/components/devTools/AdminStatus';

import { StHeader } from './style';

function Header() {
  const router = useRouter();

  const logout = () => {
    sessionStorage.clear();
    router.replace('/');
  };

  return (
    <StHeader>
      {process.env.NEXT_PUBLIC_API_URL !== 'PRODUCTION' && (
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

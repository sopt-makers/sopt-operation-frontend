import { useRouter } from 'next/router';

import { IcGoPrev } from '@/assets/icons';

import { StHeader } from './style';

function Header() {
  const router = useRouter();
  return (
    <StHeader>
      <div onClick={() => router.back()}>
        <IcGoPrev />
        <p>이전</p>
      </div>
    </StHeader>
  );
}

export default Header;

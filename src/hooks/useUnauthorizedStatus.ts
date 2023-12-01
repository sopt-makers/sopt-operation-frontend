import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useUnauthorizedStatus = (status: ADMIN_STATUS) => {
  const router = useRouter();

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      sessionStorage.getItem('adminStatus') === status
    ) {
      alert('접근 권한이 없는 계정입니다.');
      router.back();
    }
  }, [router, status]);
};

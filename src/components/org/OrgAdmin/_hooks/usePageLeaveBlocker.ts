import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

interface RouterEventOptions {
  shallow: boolean;
}

export const usePageLeaveBlocker = () => {
  const [blockedRoute, setBlockedRoute] = useState<string | null>(null);
  const isLeaveAllowedRef = useRef(false);

  const router = useRouter();

  const isPageLeaveModalOpen = blockedRoute !== null;

  const onCancelPageLeave = () => {
    setBlockedRoute(null);
  };

  const onLeavePage = () => {
    if (!blockedRoute) {
      return;
    }

    isLeaveAllowedRef.current = true;
    router.push(blockedRoute);
  };

  const blockPageLeave = useCallback((url: string) => {
    setBlockedRoute(url);
  }, []);

  // 새로고침, 탭 닫기 차단
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 브라우저 뒤로가기/앞으로가기 차단
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (isLeaveAllowedRef.current || as === router.asPath) {
        return true;
      }

      blockPageLeave(as);
      window.history.pushState(null, '', router.asPath);

      return false;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [blockPageLeave, router, router.asPath]);

  // Next.js 내부 라우트 이동 차단
  useEffect(() => {
    const handleRouteChangeStart = (
      url: string,
      options: RouterEventOptions,
    ) => {
      if (isLeaveAllowedRef.current || url === router.asPath) {
        return;
      }

      blockPageLeave(url);

      router.events.emit(
        'routeChangeError',
        'Route change cancelled by leave confirm.',
        url,
        options,
      );

      throw new Error('Route change cancelled by leave confirm.');
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [blockPageLeave, router, router.asPath]);

  return {
    isPageLeaveModalOpen,
    onCancelPageLeave,
    onLeavePage,
  };
};

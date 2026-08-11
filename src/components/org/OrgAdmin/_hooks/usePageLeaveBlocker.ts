import { useRouter } from 'next/router';
import { useCallback, useEffect, useRef, useState } from 'react';

interface RouterEventOptions {
  shallow: boolean;
}

interface PendingLeave {
  action: () => void;
  allowsRouteChange: boolean;
}

export const usePageLeaveBlocker = (isEditing: boolean) => {
  const [pendingLeave, setPendingLeave] = useState<PendingLeave | null>(null);
  const isLeaveAllowedRef = useRef(false);

  const router = useRouter();

  const isPageLeaveModalOpen = pendingLeave !== null;

  const onCancelPageLeave = () => {
    setPendingLeave(null);
  };

  const onLeavePage = () => {
    if (!pendingLeave) {
      return;
    }

    isLeaveAllowedRef.current = pendingLeave.allowsRouteChange;
    setPendingLeave(null);
    pendingLeave.action();
  };

  const requestPageLeave = useCallback(
    (leaveAction: () => void, allowsRouteChange = false) => {
      if (!isEditing) {
        leaveAction();
        return;
      }

      setPendingLeave({ action: leaveAction, allowsRouteChange });
    },
    [isEditing],
  );

  // 새로고침, 탭 닫기 차단
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (!isEditing) {
        return;
      }

      event.preventDefault();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isEditing]);

  // 브라우저 뒤로가기/앞으로가기 차단
  useEffect(() => {
    router.beforePopState(({ as }) => {
      if (!isEditing || isLeaveAllowedRef.current || as === router.asPath) {
        return true;
      }

      requestPageLeave(() => {
        void router.push(as);
      }, true);
      window.history.pushState(null, '', router.asPath);

      return false;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [isEditing, requestPageLeave, router, router.asPath]);

  // Next.js 내부 라우트 이동 차단
  useEffect(() => {
    const handleRouteChangeStart = (
      url: string,
      options: RouterEventOptions,
    ) => {
      if (!isEditing || isLeaveAllowedRef.current || url === router.asPath) {
        return;
      }

      requestPageLeave(() => {
        void router.push(url);
      }, true);

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
  }, [isEditing, requestPageLeave, router, router.asPath]);

  return {
    isPageLeaveModalOpen,
    onCancelPageLeave,
    onLeavePage,
    requestPageLeave,
  };
};

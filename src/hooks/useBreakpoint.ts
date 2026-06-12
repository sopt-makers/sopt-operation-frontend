import { useSyncExternalStore } from 'react';

import { Breakpoint, breakpoints } from '@/styles/mediaQuery';

function getBreakpoint(): Breakpoint {
  if (window.matchMedia(`(min-width: ${breakpoints.desktopLarge}px)`).matches)
    return 'desktopLarge';
  if (window.matchMedia(`(min-width: ${breakpoints.desktop}px)`).matches)
    return 'desktop';
  if (window.matchMedia(`(min-width: ${breakpoints.tablet}px)`).matches)
    return 'tablet';
  return 'mobile';
}

function subscribe(callback: () => void) {
  const mqls = [
    window.matchMedia(`(max-width: ${breakpoints.tablet - 1}px)`),
    window.matchMedia(
      `(min-width: ${breakpoints.tablet}px) and (max-width: ${breakpoints.desktop - 1}px)`,
    ),
    window.matchMedia(
      `(min-width: ${breakpoints.desktop}px) and (max-width: ${breakpoints.desktopLarge - 1}px)`,
    ),
    window.matchMedia(`(min-width: ${breakpoints.desktopLarge}px)`),
  ];
  mqls.forEach((m) => m.addEventListener('change', callback));
  return () => mqls.forEach((m) => m.removeEventListener('change', callback));
}

export function useBreakpoint() {
  const bp = useSyncExternalStore(
    subscribe,
    getBreakpoint,
    () => 'desktop' as Breakpoint,
  );

  return {
    breakpoint: bp,
    isMobile: bp === 'mobile',
    isTablet: bp === 'tablet',
    isDesktop: bp === 'desktop',
    isDesktopLarge: bp === 'desktopLarge',
    isMobileOrTablet: bp === 'mobile' || bp === 'tablet',
  };
}

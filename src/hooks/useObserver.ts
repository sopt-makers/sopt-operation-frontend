import { RefObject, useEffect } from 'react';
import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

interface UseObserver {
  target: RefObject<HTMLElement>;
  fetchNextPage: (
    options?: FetchNextPageOptions,
  ) => Promise<InfiniteQueryObserverResult<any, unknown>>;
  root?: HTMLElement;
  rootMargin?: string;
  threshold?: number;
}

const useObserver = (props: UseObserver) => {
  const {
    target, // 감지할 대상
    fetchNextPage,
    root = null, // 교차할 부모 요소, default: documentElement
    rootMargin = '0px', // root와 target이 감지하는 여백의 거리
    threshold = 1.0, // 임계점 - 1.0이면 root내에서 target이 100% 보여질 때 callback 실행
  } = props;

  const onIntersect: IntersectionObserverCallback = ([entry]) =>
    entry.isIntersecting && fetchNextPage();

  useEffect(() => {
    let observer: IntersectionObserver;

    if (target && target.current) {
      observer = new IntersectionObserver(onIntersect, {
        root,
        rootMargin,
        threshold,
      });
      observer.observe(target.current);
    }

    return () => observer && observer.disconnect();
  }, [target, rootMargin, threshold]);
};

export default useObserver;

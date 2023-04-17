import { useEffect } from 'react';

import { StyledLoading } from './style';

function Loading() {
  useEffect(() => {
    const body = document.querySelector('body');

    if (body) {
      body.style.overflow = 'hidden';
    }
    return () => {
      if (body) {
        body.style.overflow = 'scroll';
      }
    };
  }, []);

  return (
    <StyledLoading>
      <div />
    </StyledLoading>
  );
}

export default Loading;

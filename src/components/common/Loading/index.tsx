import { useEffect } from 'react';

import { StyledLoading } from './style';

interface Props {
  dimmed?: boolean;
  full?: boolean;
}

function Loading(props: Props) {
  const { dimmed = true, full = true } = props;

  useEffect(() => {
    const body = document.querySelector('body');

    if (body && full) {
      body.style.overflow = 'hidden';
    }
    return () => {
      if (body && full) {
        body.style.overflow = 'scroll';
      }
    };
  }, [full]);

  return (
    <StyledLoading dimmed={dimmed} full={full}>
      <div />
    </StyledLoading>
  );
}

export default Loading;

import { useEffect } from 'react';

import { StyledLoading } from './style';

interface Props {
  dimmed?: boolean;
}

function Loading(props: Props) {
  const { dimmed = true } = props;

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
    <StyledLoading dimmed={dimmed}>
      <div />
    </StyledLoading>
  );
}

export default Loading;

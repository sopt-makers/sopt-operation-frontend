import { ReactNode } from 'react';

import { StFooter, StFooterWrap } from './style';

interface Props {
  children: ReactNode;
}

function Footer(props: Props) {
  const { children } = props;

  return (
    <StFooterWrap>
      <StFooter>{children}</StFooter>
    </StFooterWrap>
  );
}

export default Footer;

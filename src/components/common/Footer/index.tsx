import { ReactNode } from 'react';

import { StFooter, StFooterWrap } from './style';

interface Props {
  children: ReactNode;
}

function Footer(props: Props) {
  const { children } = props;

  return (
    <StFooterWrap>
      <StFooter>
        <div>{children}</div>
      </StFooter>
    </StFooterWrap>
  );
}

export default Footer;

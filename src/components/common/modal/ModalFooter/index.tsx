import { ReactNode } from 'react';

import { StModalFooterWrapper } from './style';

interface Props {
  children: ReactNode;
}

function ModalFooter(props: Props) {
  const { children } = props;
  return <StModalFooterWrapper>{children}</StModalFooterWrapper>;
}

export default ModalFooter;

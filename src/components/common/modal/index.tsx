import { ReactNode } from 'react';

import { StModalBackground, StModalWrapper } from './style';

interface Props {
  children: ReactNode;
  onClose?: () => void;
}

function Modal(props: Props) {
  const { children, onClose } = props;

  return (
    <StModalBackground onClick={onClose}>
      <StModalWrapper>{children}</StModalWrapper>
    </StModalBackground>
  );
}

export default Modal;

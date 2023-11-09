import { ReactNode } from 'react';

import { StFloatingButton } from './style';

interface Props {
  content: ReactNode;
  onClick: () => void;
}

function FloatingButton(props: Props) {
  const { content, onClick } = props;

  return <StFloatingButton onClick={onClick}>{content}</StFloatingButton>;
}

export default FloatingButton;

import { ReactNode } from 'react';

import { StContent, StSnackBar } from '@/components/orgAdmin/SnackBar/style';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

function SnackBar({ children, onClose }: Props) {
  return (
    <StSnackBar onClick={onClose}>
      <StContent>{children}</StContent>
    </StSnackBar>
  );
}

export default SnackBar;

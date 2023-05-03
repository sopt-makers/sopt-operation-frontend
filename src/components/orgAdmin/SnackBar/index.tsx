import { ReactNode } from 'react';
import { StContainer, StContent } from '@/components/orgAdmin/SnackBar/style';

interface Props {
  children: ReactNode;
  onClose: () => void;
}

export const SnackBar = ({ children, onClose }: Props) => {
  return (
    <StContainer onClick={onClose}>
      <StContent>{children}</StContent>
    </StContainer>
  );
};

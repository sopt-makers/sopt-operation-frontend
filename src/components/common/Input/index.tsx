import { ReactNode } from 'react';

import { StInputLayout } from './style';

interface Props {
  children: ReactNode;
}

const Input = (props: Props) => {
  const { children } = props;

  return <StInputLayout>{children}</StInputLayout>;
};

export default Input;

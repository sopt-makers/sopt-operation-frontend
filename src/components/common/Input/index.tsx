import { ReactNode } from 'react';

import { StFormLayout } from './style';

interface Props {
  children: ReactNode;
}

const Input = (props: Props) => {
  const { children } = props;

  return <StFormLayout>{children}</StFormLayout>;
};

export default Input;

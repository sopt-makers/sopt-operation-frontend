import { ReactNode } from 'react';

import { StLayout } from './style';

interface Props {
  title: string;
  children?: ReactNode;
}

const InputContainer = (props: Props) => {
  const { title, children } = props;

  return (
    <StLayout>
      <p>{title}</p>
      <div>{children}</div>
    </StLayout>
  );
};

export default InputContainer;

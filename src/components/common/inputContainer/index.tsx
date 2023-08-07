import { ReactNode } from 'react';

import { StLayout } from './style';

interface Props {
  title: string;
  children?: ReactNode;
  onClick?: () => void;
}

const InputContainer = (props: Props) => {
  const { title, children, onClick } = props;

  return (
    <StLayout onClick={onClick}>
      <p>{title}</p>
      <div>{children}</div>
    </StLayout>
  );
};

export default InputContainer;

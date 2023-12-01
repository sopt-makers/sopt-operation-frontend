import { ReactNode } from 'react';

import { StList } from './style';

interface Props {
  children: ReactNode;
}

function ListWrapper(props: Props) {
  const { children } = props;

  return <StList>{children}</StList>;
}

export default ListWrapper;

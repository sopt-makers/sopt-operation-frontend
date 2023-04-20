import { ReactNode } from 'react';

import { StList } from './style';

interface Props {
  tableWidth?: string[]; // % 단위
  children: ReactNode;
}

/**
 * 리스트에 스타일 입혀주는 Wrapper Component
 * @param children thead는 th를 tr로 감싸고, tbody는 td를 tr로 감싸야함
 * @returns 리스트에 스타일을 입혀서 반환
 */
function ListWrapper(props: Props) {
  const { children, tableWidth = [] } = props;

  return <StList tableWidth={tableWidth}>{children}</StList>;
}

export default ListWrapper;

import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StHeader = styled.header`
  position: fixed;
  z-index: ${zIndex.header};
  top: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 6rem;
  background-color: ${({ theme }) => theme.color.grayscale.gray10};
`;

import styled from '@emotion/styled';

export const StHeader = styled.header`
  position: fixed;
  top: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 6rem;
  background-color: ${({ theme }) => theme.color.grayscale.gray10};
`;

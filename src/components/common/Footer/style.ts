import styled from '@emotion/styled';

export const StFooterWrap = styled.div`
  width: 100%;
  height: 15rem;
`;
export const StFooter = styled.footer`
  position: fixed;
  bottom: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 11rem;
  padding: 2rem 12rem;
  background-color: ${({ theme }) => theme.color.grayscale.gray20};
  box-shadow: 6px 0 40px 0 rgba(0, 0, 0, 0.06);
`;

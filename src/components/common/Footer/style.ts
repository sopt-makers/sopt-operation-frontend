import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StFooterWrap = styled.div`
  width: 100%;
  height: 15rem;
`;
export const StFooter = styled.footer`
  position: fixed;
  z-index: ${zIndex.footer};
  bottom: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 11rem;
  background-color: ${({ theme }) => theme.color.grayscale.gray20};
  box-shadow: 6px 0 40px 0 rgba(0, 0, 0, 0.06);
  & > div {
    width: 100%;
    height: 100%;
    max-width: 98rem;
    margin: 0 auto;
    padding: 2rem 0;
  }
`;

import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StComponent = {
  NavWrapper: styled.nav`
    position: fixed;
    z-index: ${zIndex.nav};
    left: 0;
    top: 0;
    width: 22rem;
    height: 100%;

    background-color: ${({ theme }) => theme.color.grayscale.white100};
  `,
};

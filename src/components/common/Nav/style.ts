import styled from '@emotion/styled';

export const StComponent = {
  NavWrapper: styled.nav`
    position: fixed;
    left: 0;
    top: 0;
    width: 22rem;
    height: 100%;

    background-color: ${({ theme }) => theme.MainColor.PURPLE_100};
  `,
};

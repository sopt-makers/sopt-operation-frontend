import { css } from '@emotion/react';
import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StyledLoading = styled.div<{ dimmed: boolean; full: boolean }>`
  background: ${({ dimmed }) =>
    dimmed ? 'rgba(0, 0, 0, 0.4)' : 'transparent'};
  ${({ full }) =>
    full &&
    css`
      width: 100%;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      z-index: ${zIndex.dim};
    `}
  display: flex;
  justify-content: center;
  align-items: center;

  & > div {
    width: 4.8rem;
    height: 4.8rem;
    border-radius: 100%;
    border: 4px solid white;
    border-width: 4px;
    border-top-color: ${({ theme }) => theme.color.grayscale.black100};
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

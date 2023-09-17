import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StyledLoading = styled.div`
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: ${zIndex.dim};

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

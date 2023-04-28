import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: ${zIndex.dim};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StModalWrapper = styled.div`
  width: 90rem;
  height: auto;

  background-color: ${({ theme }) => theme.color.grayscale.white100};
  box-shadow: 0px 0px 40px rgba(16, 24, 40, 0.06);
  border-radius: 1.2rem;

  z-index: ${zIndex.modal};

  animation: appearModal 0.6s forwards;

  @keyframes appearModal {
    from {
      opacity: 0;
      transform: translateY(2rem);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

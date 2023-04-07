// style.ts
import styled from '@emotion/styled';

export const StModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
`;

export const StModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 90rem;
  height: auto;

  background-color: ${({ theme }) => theme.color.grayscale.white100};
  box-shadow: 0px 0px 40px rgba(16, 24, 40, 0.06);
  border-radius: 1.2rem;

  z-index: 2;
`;

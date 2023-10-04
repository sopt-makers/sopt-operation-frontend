import styled from '@emotion/styled';

import { body2 } from '@/styles/fonts';

export const StButton = styled.button`
  ${body2}
  transition: transform 0.1s;
  display: inline-block;

  padding: 0.6rem 1rem;
  border: 0.1rem solid ${({ theme }) => theme.color.grayscale.gray60};
  border-radius: 1.6rem;
  background-color: ${({ theme }) => theme.color.grayscale.gray20};
  color: ${({ theme }) => theme.color.grayscale.black40};

  &:disabled {
    background-color: ${({ theme }) => theme.color.grayscale.gray10};
    border: 1px solid ${({ theme }) => theme.color.grayscale.gray20};
    color: ${({ theme }) => theme.color.grayscale.gray30};
    cursor: default;
  }
  cursor: pointer;
  &:not(:disabled):hover {
    transform: scale(1.15);
    border-color: ${({ theme }) => theme.color.grayscale.gray100};
  }
`;

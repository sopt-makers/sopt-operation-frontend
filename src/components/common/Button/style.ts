import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Props } from './index';
export const StButton = styled.button<Pick<Props, 'type'>>`
  height: 4.8rem;
  padding: 1.6rem 2.4rem;
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 600;
  border-radius: 4rem;
  &:disabled {
    background-color: ${({ theme }) => theme.color.grayscale.gray30};
    border: 1px solid ${({ theme }) => theme.color.grayscale.gray30};
    color: ${({ theme }) => theme.color.grayscale.white100};
    cursor: default;
  }
  ${({ theme, type }) =>
    type === 'button'
      ? css`
          background-color: ${theme.color.grayscale.white100};
          border: 1px solid ${theme.color.grayscale.gray30};
          color: ${theme.color.grayscale.gray60};
        `
      : type === 'submit'
      ? css`
          background-color: ${theme.color.main.purple100};
          border: 1px solid ${theme.color.main.purple100};
          color: ${theme.color.grayscale.white100};
        `
      : css`
          background-color: ${theme.color.grayscale.gray30};
          border: 1px solid ${theme.color.grayscale.gray30};
          color: ${theme.color.grayscale.white100};
        `};
`;

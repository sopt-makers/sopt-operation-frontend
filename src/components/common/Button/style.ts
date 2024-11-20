import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { Props } from './index';

export const StButton = styled.button<Pick<Props, 'type'>>`
  height: 4.8rem;
  padding: 1.6rem 2.4rem;
  font-size: 1.6rem;
  line-height: 1;
  font-weight: 600;
  padding: 1.6rem 2.4rem;
  border-radius: 1rem;
  &:disabled {
    background-color: ${colors.gray600};
    color: ${colors.gray400};
    cursor: default;
  }
  &:hover {
    background-color: ${colors.gray600};
  }
  ${({ theme, type }) =>
    type === 'button'
      ? css`
          background: none;
          color: ${colors.gray200};
        `
      : type === 'submit'
        ? css`
            background-color: ${colors.white};
            color: ${colors.black};
          `
        : css`
            background: none;
            color: ${colors.white};
          `};
`;

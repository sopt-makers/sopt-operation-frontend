import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const StPartFilter = styled.div`
  padding: 0.8rem 1rem;
  background-color: ${({ theme }) => theme.color.grayscale.gray10};
  border-radius: 4rem;
  width: fit-content;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.02);
`;
export const FilterButton = styled.button<{ selected: boolean }>`
  font-size: 1.4rem;
  line-height: 1.7rem;
  padding: 1.1rem 3.6rem;
  border-radius: 4rem;
  transition: all 0.2s;
  ${({ theme, selected }) =>
    selected
      ? css`
          font-weight: 600;
          color: ${theme.color.grayscale.gray10};
          background-color: ${theme.color.main.purple100};
        `
      : css`
          font-weight: 400;
          color: ${theme.color.grayscale.gray80};
          background-color: ${theme.color.grayscale.gray10};
        `}
`;

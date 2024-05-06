import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const FilterWrapper = styled.div`
  display: flex;
  gap: 26px;
`;
export const StUnderline = styled.div`
  width: calc(100vw - 212px);
  margin-left: calc((100vw - 212px - 100%) / -2);
  height: 1px;
  background-color: ${colors.gray800};
`;
export const FilterButtonItem = styled.button<{ selected: boolean }>`
  ${fontsObject.TITLE_4_20_SB}

  padding-bottom: 13px;
  transition: all 0.2s;

  ${({ selected }) =>
    selected
      ? css`
          color: ${colors.gray30};
          border-bottom: 3px solid ${colors.gray30};
        `
      : css`
          color: ${colors.gray400};
          border-bottom: 3px solid transparent;
        `}

  &:hover {
    color: ${colors.gray100};
  }
`;

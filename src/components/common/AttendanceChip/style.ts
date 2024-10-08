import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const IndicatorStructure = styled.span`
  ${fontsObject.BODY_3_14_M}
  display: inline-block;
  color: ${colors.gray10};
  border-radius: 8px;
  padding: 2px 11px;
  margin-right: 6px;
`;

export const StAttendanceChip = styled(IndicatorStructure)<{ text: string }>`
  ${({ text }) => getChipColor(text)}
`;

const getChipColor = (text: string) => {
  switch (text) {
    case '출석':
    case '참여':
      return css`
        background-color: ${colors.green900};
        color: ${colors.information};
      `;
    case '결석':
      return css`
        background-color: ${colors.red800};
        color: ${colors.red300};
      `;
    case '지각':
      return css`
        background-color: ${colors.yellow900};
        color: ${colors.attention};
      `;
    case '미참여':
      return css`
        background-color: ${colors.gray600};
        color: ${colors.gray200};
      `;
    default:
      if (text.includes('-')) {
        return css`
          background-color: ${colors.red800};
          color: ${colors.red300};
        `;
      }
      return css`
        background-color: ${colors.gray600};
        color: ${colors.gray10};
        padding: 2px 8px;
      `;
  }
};

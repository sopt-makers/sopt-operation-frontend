import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

export const IndicatorStructure = styled.span`
  ${fonts.LABEL_12_SB}
  display: inline-block;
  color: ${colors.gray200};
  border: 1px solid ${colors.gray500};
  border-radius: 20px;
  padding: 3.5px 8px;
  margin-right: 10px;
`;

export const StSessionIndicator = styled(IndicatorStructure)<{
  attributeName: string;
}>`
  ${({ attributeName }) =>
    attributeName === '세미나'
      ? css`
          border-color: ${colors.orange600};
          color: ${colors.orange600};
        `
      : attributeName === '행사'
      ? css`
          border-color: ${colors.blue400};
          color: ${colors.blue400};
        `
      : css`
          border-color: ${colors.yellow700};
          color: ${colors.yellow700};
        `}
`;

export const StChip = styled(IndicatorStructure)<{ text: string }>`
  ${({ text }) => getChipColor(text)}
`;

const getChipColor = (text: string) => {
  switch (text) {
    case '세미나':
      return css`
        border-color: ${colors.orange600};
        color: ${colors.orange600};
      `;
    case '행사':
      return css`
        border-color: ${colors.blue400};
        color: ${colors.blue400};
      `;
    case '기타':
      return css`
        border-color: ${colors.yellow700};
        color: ${colors.yellow700};
      `;
    default:
      return css`
        border-color: ${colors.gray500};
        color: ${colors.gray200};
      `;
  }
};

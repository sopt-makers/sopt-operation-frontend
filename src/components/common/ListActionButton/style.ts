import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StButton = styled.button`
  ${fontsObject.BODY_3_14_M}
  color: ${colors.gray10};
  transition: transform 0.1s;

  display: inline-block;

  padding: 6px 10px;
  border: 1px solid ${colors.gray300};
  border-radius: 8px;
  background-color: ${colors.gray600};
  cursor: pointer;

  &:disabled {
    color: ${colors.gray500};
    background-color: ${colors.gray800};
    border-color: ${colors.gray800};
    cursor: default;
  }
  &:not(:disabled):hover {
    transform: scale(1.15);
  }
`;

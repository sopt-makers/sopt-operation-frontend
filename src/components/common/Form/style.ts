import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StFormLayout = styled.div<{ hasValue?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4.4rem;

  border: ${({ hasValue, theme }) =>
    hasValue
      ? `1px solid ${theme.color.grayscale.black40}`
      : `1px solid ${colors.gray30}`};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;
`;

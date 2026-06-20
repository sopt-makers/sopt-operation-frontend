import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StChipWrapper = styled.div`
  display: flex;
  gap: 6px;
`;

export const StList = styled.ol`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

export const StItem = styled.li`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StWeek = styled.label`
  color: ${colors.gray300};
  ${fontsObject.BODY_1_18_M}
`;

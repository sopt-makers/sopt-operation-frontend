import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;
export const StChipWrapper = styled.div`
  display: flex;
  gap: 6px;
`;
export const StList = styled.ol`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;
export const StItem = styled.li`
  display: flex;
  gap: 10px;
`;
export const StWeek = styled.label`
  color: ${colors.gray300};
  ${fontsObject.BODY_1_18_M}
  line-height: 48px;
`;

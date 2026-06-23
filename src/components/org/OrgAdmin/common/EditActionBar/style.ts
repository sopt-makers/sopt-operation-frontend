import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StEditActionBarWrapper = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  z-index: 1;
`;

export const StEditActionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const StEditActionButtonWrapper = styled.div`
  display: flex;
  gap: 14px;
  align-self: flex-end;
`;

export const StUnsavedChangeText = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.error};

  &::before {
    content: '▲';
    margin-right: 6px;
  }
`;

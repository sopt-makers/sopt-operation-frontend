import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';

import theme from '@/styles/theme';

export const StSubmitButton = styled.button`
  position: fixed;
  bottom: 54px;
  right: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 112px;
  height: 56px;
  border-radius: 12px;
  background-color: ${theme.color.grayscale.realwhite};
`;

export const StSubmitText = styled.span`
  ${fontsObject.LABEL_1_18_SB}
`;

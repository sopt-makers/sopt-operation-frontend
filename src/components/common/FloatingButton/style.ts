import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import zIndex from '@/utils/zIndex';

export const StFloatingButton = styled.button`
  position: fixed;
  right: 60px;
  bottom: 60px;
  padding: 14px 30px;
  border-radius: 60px;
  z-index: ${zIndex.footer};
  background-color: ${colors.gray10};
  color: ${colors.gray900};
  ${fontsObject.TITLE_4_20_SB}
`;

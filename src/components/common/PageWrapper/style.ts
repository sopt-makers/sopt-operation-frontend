import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const pageWrapperCss = css({
  '& > h1': {
    color: colors.gray10,
    ...fontsObject.TITLE_1_32_SB,

    paddingBottom: '4.9rem',
  },
});

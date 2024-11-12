import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const listItemCss = css({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  width: '100%',
  height: '9rem',

  padding: '2rem 3rem 2rem 1.5rem',

  border: `0.1rem solid ${colors.gray800}`,
  borderRadius: '1rem',

  color: colors.gray10,

  '&:hover': {
    backgroundColor: colors.gray900,
  },
  '& > div:first-of-type': {
    ...fontsObject.TITLE_6_16_SB,
  },

  '& > div:nth-of-type(2)': {
    ...fontsObject.BODY_3_14_M,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: '0.8rem',
    flexGrow: 1,

    padding: '0 2rem 0 7.1rem',
  },

  '& > div:last-of-type': {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',

    '& > svg': {
      width: '2.4rem',

      cursor: 'pointer',
    },
  },
});

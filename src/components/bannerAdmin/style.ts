import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';

export const bannerListHeaderCss = css({
  display: 'flex',

  width: '100%',
  padding: '4.9rem 0 2.4rem 0',

  color: colors.white,
});

export const bannerListCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',

  paddingTop: '4.9rem',
});

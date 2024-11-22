import { css } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import { Progress, TagType } from '../types';

export const listItemCss = css({
  display: 'grid',
  gridTemplateColumns: '1.3fr 10fr 0.5fr',
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
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    alignItems: 'center',
    gap: '0.8rem',
    flexGrow: 1,

    padding: '0 2rem 0 7.1rem',

    '& > *': {
      width: 'fit-content',
    },
  },

  '& > div:last-of-type': {
    display: 'flex',
    alignItems: 'center',
    gap: '1.2rem',
    justifyContent: 'flex-end',

    '& > svg': {
      width: '2.4rem',

      cursor: 'pointer',
    },
  },
});

export const progressColor = '--operation-progress-color';
export const tagBackgroundColor = '--operation-tag-background-color';

interface ProgressColorVariant {
  [progressColor]: string;
}

interface TagColorVariant {
  [tagBackgroundColor]: string;
}

export const progressColorVariant: Record<Progress, ProgressColorVariant> = {
  reserved: { [progressColor]: colors.secondary },
  finished: { [progressColor]: colors.error },
  'in-progress': { [progressColor]: colors.success },
};

export const tagColorVariant: Record<TagType, TagColorVariant> = {
  'pg-community': { [tagBackgroundColor]: '#58CF0580' },
  'cr-main': { [tagBackgroundColor]: '#00AEFF80' },
  'cr-feed': { [tagBackgroundColor]: '#FA73E380' },
  org: { [tagBackgroundColor]: colors.orangeAlpha500 },
};

export const progressCss = css({
  color: `var(${progressColor})`,
});

export const tagCss = css({
  backgroundColor: `var(${tagBackgroundColor})`,
});

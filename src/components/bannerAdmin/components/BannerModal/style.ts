import { css } from '@emotion/react';

export const modalContentCss = css({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.2rem',

  padding: '2.6rem 3rem',

  '& .radio-group': {
    display: 'flex',
    flexDirection: 'row',
    gap: '1.6rem',
  },
});

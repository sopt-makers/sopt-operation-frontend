import { Interpolation } from '@emotion/react';
import { css, Theme } from '@emotion/react';

const global: Interpolation<Theme> = css`
  html,
  body {
    margin: 0;
    padding: 0;
  }
`;

export default global;

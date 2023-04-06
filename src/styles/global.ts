import { Interpolation } from '@emotion/react';
import { css, Theme } from '@emotion/react';
import emotionReset from 'emotion-reset';

const global: Interpolation<Theme> = (theme: Theme) => css`
  ${emotionReset}

  html {
    font-size: 10px;
  }
  body {
    margin: 0;
    padding: 0;
    background-color: ${theme.color.grayscale.gray20};
  }
  button {
    border: none;
    font-size: 10px;
    padding: 0;
    cursor: pointer;
  }
  a {
    color: black;
    text-decoration: none;
  }
`;

export default global;

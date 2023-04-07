import { Interpolation } from '@emotion/react';
import { css, Theme } from '@emotion/react';
import emotionReset from 'emotion-reset';

const global: Interpolation<Theme> = (theme: Theme) => css`
  ${emotionReset}

  * {
    font-family: 'SUIT', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  html,
  body {
    font-size: 10px;
    width: 100%;
    min-height: 100%;
    background-color: ${theme.color.grayscale.gray20};
    font-family: 'SUIT', sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  #__next {
    width: 100%;
    min-height: 100%;
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

  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Regular.woff2')
      format('woff2');
    font-weight: 400;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Medium.woff2')
      format('woff2');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Bold.woff2')
      format('woff2');
    font-weight: 700;
    font-style: normal;
  }
`;

export default global;

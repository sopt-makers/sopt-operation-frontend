import { css, Interpolation, Theme } from '@emotion/react';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import emotionReset from 'emotion-reset';

const global: Interpolation<Theme> = (theme: Theme) => css`
  ${emotionReset}

  * {
    box-sizing: border-box;
  }
  html,
  body {
    font-size: 10px;
    width: 100%;
    min-height: 100%;

    background-color: ${colors.background};
    font-family: 'SUIT', sans-serif;
    font-weight: 400;
    font-style: normal;

    overflow-y: scroll;
    overflow-x: hidden;

    font-smooth: never;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &::-webkit-scrollbar {
      width: 1.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background: ${colors.gray500};
      border-radius: 5px;
      background-clip: padding-box;
      border: 3px solid transparent;
    }
    ::-webkit-scrollbar-corner {
      display: none;
    }
  }
  #__next {
    width: 100%;
    min-height: 100%;

    div > .main-wrapper {
      overflow: hidden;
    }
  }
  button {
    border: none;
    background: none;
    font-size: 10px;
    padding: 0;
    cursor: pointer;
  }
  a {
    color: black;
    text-decoration: none;
  }

  .react-calendar {
    width: 100%;
    height: 100%;
    font-family: SUIT;
    color: ${colors.gray400};
    background: ${colors.gray600};
    border: none;
  }

  @media (max-width: 768px) {
    .react-calendar {
      background: ${colors.gray800};
    }
    .react-calendar__navigation {
      padding: 0px 20px;
    }
  }

  .react-calendar__navigation button {
    min-width: fit-content;
    width: 30px;

    &:disabled {
      background: none;
    }
  }

  .react-calendar__navigation {
    gap: 15px;
    margin-bottom: 0;
  }

  .react-calendar__navigation__label {
    display: flex;
    align-items: center;

    cursor: auto;
  }

  .react-calendar__navigation__label > span {
    padding-left: 7.5px;
    color: ${colors.gray10};
    font-family: SUIT;
    font-size: 16px;
    cursor: auto;
    font-style: normal;
    font-weight: 700;
    order: 1;
  }

  .react-calendar__navigation__arrow {
    color: ${colors.gray10};
    order: 2;
    align-items: center;
    cursor: pointer;
    font-size: 30px;
    background: none;
    width: 20px;
  }

  .react-calendar__navigation__arrow:hover {
    background-color: none;
  }

  .react-calendar__navigation__arrow:enabled,
  .react-calendar__navigation__arrow:enabled:hover,
  .react-calendar__navigation__arrow:disabled,
  .react-calendar__navigation__arrow:disabled:hover,
  .react-calendar__navigation__arrow:enabled:focus {
    background: none;
  }

  .react-calendar__navigation button:disabled {
    background: none;
  }

  .react-calendar__month-view__weekdays__weekday > abbr {
    font: ${fontsObject.LABEL_4_12_SB};
    text-decoration: none;
  }

  .react-calendar__tile {
    font-family: SUIT;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    color: ${colors.gray10};
    text-align: center;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .react-calendar__tile:hover,
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background: none;
  }

  .react-calendar__tile abbr:hover {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.gray10};
    color: ${colors.gray800};
    border-radius: 100%;
  }

  .react-calendar__tile abbr:enabled:hover,
  .react-calendar__tile abbr:enabled:focus {
    background: ${colors.gray10};
  }

  .react-calendar__tile--now {
    background: none;
    justify-content: center;
  }

  .react-calendar__tile--now:hover {
    background: none;
  }

  .react-calendar__tile--now abbr:hover {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.gray10};
    color: ${colors.gray800};
    border-radius: 100%;
  }

  .react-calendar__tile--active {
    background: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
  }

  .react-calendar__tile--active:hover {
    background: none;
  }

  .react-calendar__tile--active abbr {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${colors.gray10};
    color: ${colors.gray800};
    border-radius: 100%;
  }

  .react-calendar__tile--active abbr:hover {
    background: ${colors.gray10};
  }

  @font-face {
    font-family: 'SUIT';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-Light.woff2')
      format('woff2');
    font-weight: 300;
    font-style: normal;
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
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_suit@1.0/SUIT-SemiBold.woff2')
      format('woff2');
    font-weight: 600;
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

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StAttendanceModal = styled.div`
  & > div {
    width: 90rem;
    padding: 3.2rem 4rem 0 4rem;
  }
  .timer {
    text-align: center;
    font-size: 4.8rem;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 6.72rem */
    letter-spacing: -0.096rem;
    color: ${colors.gray10};
    margin-bottom: 2rem;
    &-warn {
      color: ${colors.error};
    }
  }
  .code-wrapper {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 5.6rem;
    & > div {
      width: 8.2rem;
      height: 11.2rem;
      border-radius: 0.8rem;
      background-color: ${colors.gray700};
      display: flex;
      justify-content: center;
      align-items: center;
      & > p {
        color: ${colors.gray10};
        text-align: center;
        font-feature-settings:
          'clig' off,
          'liga' off;
        font-family: SUIT;
        font-size: 4rem;
        font-style: normal;
        font-weight: 700;
        line-height: 160%; /* 6.4rem */
        letter-spacing: -0.08rem;
      }
    }
  }
  & > footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    p {
      ${fontsObject.TITLE_7_14_SB}
      color: ${colors.error};
    }
  }
`;

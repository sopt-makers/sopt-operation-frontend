import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StSessionModalWrapper = styled.section`
  width: 46rem;

  & > main {
    padding: 1.6rem 3rem 3.2rem 3rem;

    & > .dropdowns {
      display: flex;
      gap: 1.6rem;
    }

    & > .inputs {
      display: flex;
      flex-direction: column;
      align-self: stretch;

      & > .time {
        display: flex;
        gap: 1.6rem;

        & > div {
          flex: 1;
        }
      }
    }
  }

  & > footer {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

export const StPartSelector = styled.div`
  position: relative;
  width: 100%;

  font-weight: 600;
  font-size: 2rem;
  line-height: 140%;
  letter-spacing: -0.02em;

  & > svg {
    cursor: pointer;
  }
`;

export const StSelectedPart = styled.span<{ textColor: string }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.4rem;

  cursor: pointer;
  color: ${({ textColor }) => textColor};
`;

export const StDatePickerInput = styled.div<{ hasValue?: boolean }>`
  width: 100%;
  height: auto;

  & > div.react-datepicker-wrapper {
    width: 100%;
    height: auto;

    & > div {
      width: 100%;
      height: auto;

      & > input {
        width: 100%;
        height: auto;

        padding: 1rem 1.4rem;

        color: ${colors.gray10};
        background-color: ${colors.gray700};

        font-size: 1.6rem;
        font-style: normal;
        font-weight: 500;
        line-height: 165%; /* 2.64rem */
        letter-spacing: -0.024rem;

        outline: none;
        border: none;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;

        &::placeholder {
          color: ${colors.gray400};

          font-size: 1.6rem;
          font-style: normal;
          font-weight: 500;
          line-height: 165%; /* 2.64rem */
          letter-spacing: -0.024rem;
        }
      }
    }
  }

  & > div.react-datepicker__tab-loop {
    width: auto;
  }
`;

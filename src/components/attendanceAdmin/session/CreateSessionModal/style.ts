import styled from '@emotion/styled';

import { display1 } from '@/styles/fonts';

export const StWrapper = styled.div`
  padding: 0 4rem;
`;

export const StTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: 3.2rem;
  margin-bottom: 0.8rem;

  & > h1 {
    ${display1}
    color: ${({ theme }) => theme.color.grayscale.black40};
  }

  & > svg {
    margin-top: 1rem;

    cursor: pointer;
  }
`;
export const StHeader = styled.header`
  & > h2 {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 140%;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.grayscale.gray80};
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

export const StInformationSection = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 3.2rem 0 5.6rem 0;

  & > p {
    font-weight: 600;
    font-size: 2rem;
    line-height: 140%;
    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.color.main.purple100};
  }

  & > div {
    display: flex;
    gap: 1.6rem;
    width: 100%;

    padding-top: 2rem;

    & > div.time {
      display: flex;
      flex: row;
      gap: 1.6rem;

      width: 100%;

      & > div {
        position: relative;

        width: 100%;
      }
    }
  }
`;

export const StInput = styled.input<{ hasValue?: boolean }>`
  width: 100%;
  height: auto;

  padding: 1rem 1.4rem;
  border: none;

  outline: ${({ hasValue, theme }) =>
    hasValue
      ? `1px solid ${theme.color.grayscale.black40}`
      : `1px solid ${theme.color.grayscale.gray30}`};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale.gray30};
  }
  &:focus {
    outline: ${({ theme }) => theme.color.grayscale.black40} solid 1px;
  }
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

        color: ${({ theme }) => theme.color.grayscale.black40};
        font-weight: 500;
        font-size: 1.6rem;
        line-height: 2.4rem;
        letter-spacing: -0.02em;

        outline: ${({ hasValue, theme }) =>
          hasValue
            ? `1px solid ${theme.color.grayscale.black40}`
            : `1px solid ${theme.color.grayscale.gray30}`};
        border: none;
        box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
        border-radius: 8px;

        &::placeholder {
          color: ${({ theme }) => theme.color.grayscale.gray30};

          font-weight: 500;
          font-size: 1.6rem;
          line-height: 2.4rem;
          letter-spacing: -0.02em;
        }
        &:focus {
          outline: ${({ theme }) => theme.color.grayscale.black40} solid 1px;
        }
      }
    }
  }

  & > div.react-datepicker__tab-loop {
    width: auto;
  }
`;

export const StDropDownInput = styled.div<{ hasValue?: boolean }>`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 1rem 1.4rem;

  color: ${({ theme }) => theme.color.grayscale.black40};
  outline: 1px solid ${({ theme }) => theme.color.grayscale.black40};
  border-radius: 0.8rem;

  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  letter-spacing: -0.02em;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale.gray30};
  }
`;

export const StFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 2.9rem 4rem;

  background-color: ${({ theme }) => theme.color.grayscale.gray20};

  border-radius: 0 0 1.2rem 1.2rem;

  & > article {
    display: flex;
    gap: 1.2rem;
  }
`;

export const StSessionSelector = styled.article`
  display: flex;
  gap: 1.6rem;

  & > label {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > h3 {
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: -0.02em;

      color: ${({ theme }) => theme.color.grayscale.black40};
    }
    & > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: -0.02em;

      color: ${({ theme }) => theme.color.grayscale.gray60};
    }
    &:hover {
      cursor: pointer;
    }
  }
`;

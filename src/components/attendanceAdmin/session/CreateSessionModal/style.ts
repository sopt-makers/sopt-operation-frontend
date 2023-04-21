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
  }
`;

export const StMain = styled.main`
  padding: 3.2rem 0 5.6rem 0;
`;

export const StPartSelector = styled.div`
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
  cursor: pointer;
  padding-right: 0.4rem;
  color: ${({ textColor }) => textColor};
`;

export const StFormSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding-top: 2rem;

  & > article {
    display: flex;
    flex-direction: row;
    gap: 1.6rem;

    & > .form_container {
      display: flex;
      flex-direction: column;

      width: 100%;

      & > p {
        padding-bottom: 0.6rem;

        font-weight: 500;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.02em;

        color: ${({ theme }) => theme.color.grayscale.gray100};
      }
    }

    & > .input_time {
      display: flex;
      flex-direction: row;
      gap: 1.6rem;

      width: 100%;

      & > .form_container {
        display: flex;
        flex-direction: column;

        width: 100%;

        & > p {
          padding-bottom: 0.6rem;

          font-weight: 500;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.02em;

          color: ${({ theme }) => theme.color.grayscale.gray100};
        }
      }
    }
  }
`;

export const StFormLayout = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 4.4rem;

  border: 1px solid ${({ theme }) => theme.color.grayscale.black40};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 8px;

  cursor: pointer;

  & > span {
    padding: 1.4rem;

    color: ${({ theme }) => theme.color.grayscale.black40};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;
  }

  & > input {
    width: 100%;
    height: 100%;

    padding: 1rem 1.4rem;

    color: ${({ theme }) => theme.color.grayscale.black40};
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.02em;

    border: none;

    border-radius: 8px;

    &::placeholder {
      color: ${({ theme }) => theme.color.grayscale.black40};
    }
  }

  & > div > .react-datepicker__input-container {
    & > input {
      width: 100%;
      height: 3.5rem;

      margin-left: 0.2rem;
      padding: 1rem 1.4rem;

      color: ${({ theme }) => theme.color.grayscale.black40};
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.02em;

      border: none;

      border-radius: 8px;

      &::placeholder {
        color: ${({ theme }) => theme.color.grayscale.black40};
      }
    }
  }

  & > svg {
    margin-right: 1.4rem;
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

  & > div {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;

    & > h3 {
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: -0.02em;
    }
    & > p {
      font-weight: 400;
      font-size: 14px;
      line-height: 100%;
      letter-spacing: -0.02em;
    }
  }
`;

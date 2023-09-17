import styled from '@emotion/styled';

import { display1 } from '@/styles/fonts';

export const StWrapper = styled.div`
  padding: 0 4rem;
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

    color: ${({ theme }) => theme.color.grayscale.black100};
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
    }
  }
`;

export const StFooter = styled.footer`
  display: flex;
  justify-content: space-between;

  padding: 2.9rem 4rem;

  background-color: ${({ theme }) => theme.color.grayscale.gray20};

  border-radius: 0 0 1.2rem 1.2rem;

  & > div {
    display: flex;
    gap: 1.2rem;

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
    }
  }
`;

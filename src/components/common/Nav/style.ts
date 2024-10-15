import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StNavWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 21.2rem;
  height: 100%;

  background-color: ${colors.gray900};

  & > header {
    display: flex;
    flex-direction: column;
    gap: 2.3rem;

    padding: 4.3rem 4rem 3.3rem 3rem;

    color: ${colors.gray10};
  }
`;

export const StSoptLogo = styled.h1`
  font-size: 2.1rem;
  font-style: normal;
  font-weight: 700;
  line-height: 140%;
  letter-spacing: -0.084rem;
  color: ${colors.gray10};
`;

export const StMenu = styled.div<{ currentPage: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin: 0 1.8rem 0.6rem 1.8rem;

  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.024rem;

  color: ${colors.gray300};

  & > p {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    width: 100%;

    padding: 1.3rem 1.4rem 1.3rem 2.4rem;

    text-align: center;
    background: ${({ currentPage }) =>
      currentPage ? colors.gray800 : '#fffff'};
    border-radius: 1rem;

    cursor: pointer;

    &:hover {
      background: ${colors.gray800};
    }
    &:active {
      color: ${colors.gray10};
      background-color: ${colors.gray700};
      & > svg > path {
        fill: #fcfcfc;
      }
    }
  }
`;

export const StSubMenu = styled.p<{
  currentPage: boolean | undefined;
  isLast: boolean;
}>`
  padding: 1.3rem 2.4rem 1.3rem 2.4rem;
  margin: 0.6rem 1.8rem 0.6rem 4.4rem;
  margin-bottom: ${({ isLast }) => (isLast ? '1.6rem' : '0')};

  font-family: SUIT;
  font-size: 1.6rem;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  letter-spacing: -0.024rem;

  color: ${({ currentPage }) => (currentPage ? colors.gray10 : colors.gray300)};
  background-color: ${({ currentPage }) =>
    currentPage ? colors.gray700 : 'fffff'};
  border-radius: 1rem;
  cursor: pointer;

  &:hover {
    color: ${colors.gray300};
    background-color: ${colors.gray800};
  }
  &:active {
    color: ${colors.gray10};
    background-color: ${colors.gray700};
  }
`;

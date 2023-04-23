import styled from '@emotion/styled';

export const StNavWrapper = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 22rem;
  height: 100%;

  background-color: ${({ theme }) => theme.color.grayscale.white100};

  & > header {
    display: flex;
    flex-direction: column;
    gap: 4rem;

    padding: 4rem 4rem 3.6rem 4rem;

    color: ${({ theme }) => theme.color.grayscale.black40};
  }
`;

export const StSoptLogo = styled.h1`
  font-weight: 700;
  font-size: 24px;
  line-height: 100%;
  letter-spacing: -0.02em;
`;

export const StGenerationDropdown = styled.div`
  cursor: pointer;

  & > div {
    cursor: pointer;
    & > span {
      margin-right: 0.4rem;

      font-weight: 600;
      font-size: 24px;
      line-height: 140%;
      letter-spacing: -0.02em;
    }
  }
`;

export const StMenu = styled.div<{ currentPage: boolean | undefined }>`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  margin: 0 1.6rem 0.8rem 1.6rem;

  font-weight: 600;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.02em;

  & > p {
    display: flex;
    align-items: center;
    gap: 2rem;

    width: 100%;

    padding: 1.6rem 2.4rem 1.6rem 2.4rem;

    text-align: center;
    color: ${({ theme, currentPage }) =>
      currentPage ? theme.color.main.purple100 : theme.color.grayscale.gray60};
    background: ${({ theme, currentPage }) =>
      currentPage
        ? theme.color.main.purpledim20
        : theme.color.grayscale.gray10};
    border-radius: 8rem;

    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.color.main.purple100};
      background: #c6a9ff33;
    }
  }
`;

export const StSubMenu = styled.p<{
  currentPage: boolean | undefined;
  isLast: boolean;
}>`
  padding: 1.6rem 6.9rem 1.6rem 6rem;
  margin: 0 1.6rem;
  margin-bottom: ${({ isLast }) => (isLast ? '1.6rem' : '0')};

  font-weight: 400;
  font-size: 16px;
  line-height: 100%;
  letter-spacing: -0.02em;

  color: ${({ theme, currentPage }) =>
    currentPage ? theme.color.main.purple100 : theme.color.grayscale.gray60};

  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.main.purple40};
  }
  &:active {
    color: ${({ theme }) => theme.color.main.purple100};
  }
`;

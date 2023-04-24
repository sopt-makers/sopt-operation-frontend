import styled from '@emotion/styled';

export const StLayout = styled.div`
  padding: 0 4rem;
  display: flex;
  flex-direction: column;

  & > h1 {
    font-weight: 700;
    font-size: 2.4rem;
    line-height: 140%;
    letter-spacing: -0.02em;
  }
`;

export const StContent = styled.div`
  padding: 12px;

  & > .form_container {
    padding-bottom: 2rem;
  }

  & > h2 {
    padding-bottom: 2rem;
    font-weight: bold;
    font-size: 2rem;
    line-height: 140%;
    letter-spacing: -0.02em;
  }

  & > p {
    padding-bottom: 2rem;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 20px;
    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.color.grayscale.gray100};
  }
`;

export const StCoreValueLogo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 2rem;
`;

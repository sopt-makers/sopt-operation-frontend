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

  & > h2 {
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 140%;
    letter-spacing: -0.02em;
  }

  & > p {
    padding-bottom: 0.6rem;

    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.color.grayscale.gray100};
  }
`;
export const StLogo = styled.div`
  width: 678px;
  height: 188px;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & > div {
    display: flex;

    width: 100%;
    height: 100%;
    background-color: #f2f2f2;
  }
`;

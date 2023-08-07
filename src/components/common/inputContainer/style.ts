import styled from '@emotion/styled';

export const StLayout = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;

  & > p {
    padding-bottom: 0.6rem;

    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.color.grayscale.gray100};
  }
  & > div {
    display: flex;
    align-items: center;

    width: 100%;
    height: auto;

    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;

    & > span {
      width: 100%;

      padding: 1rem 1.4rem;

      color: ${({ theme }) => theme.color.grayscale.black40};
      border: 1px solid ${({ theme }) => theme.color.grayscale.black40};
      border-radius: 0.8rem;

      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.4rem;
      letter-spacing: -0.02em;
    }
  }
`;

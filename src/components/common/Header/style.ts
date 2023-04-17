import styled from '@emotion/styled';

export const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  top: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 6rem;
  padding: 0 2.6rem;

  background-color: ${({ theme }) => theme.color.grayscale.gray10};

  button {
    display: flex;
    align-items: center;
    gap: 0.9rem;
    background: none;

    cursor: pointer;

    & > p {
      font-weight: 400;
      font-size: 1.6rem;
      line-height: 100%;
      letter-spacing: -0.02em;
    }
    &.logout > p {
      font-size: 1.2rem;
    }
    &.logout:hover {
      color: ${({ theme }) => theme.color.main.purple100};
    }
  }
`;

import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  position: fixed;
  z-index: ${zIndex.header};
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
      color: ${({ theme }) => theme.color.grayscale.black40};
    }
    &.logout > p {
      padding: 1.1rem 2.3rem;

      font-weight: 600;
      font-size: 12px;
      line-height: 100%;
      text-align: center;
      letter-spacing: -0.02em;

      background: ${({ theme }) => theme.color.grayscale.white100};
      color: ${({ theme }) => theme.color.grayscale.gray60};
      border: 0.1rem solid ${({ theme }) => theme.color.grayscale.gray20};
      border-radius: 4rem;
    }
    &.logout > p:hover {
      color: ${({ theme }) => theme.color.grayscale.black40};
      background: ${({ theme }) => theme.color.grayscale.gray20};
      border: 0.1rem solid ${({ theme }) => theme.color.grayscale.gray60};
    }
  }
`;

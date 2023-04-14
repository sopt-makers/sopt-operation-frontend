import styled from '@emotion/styled';

import zIndex from '@/utils/zIndex';

export const StHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  position: fixed;
  z-index: ${zIndex.header};
  top: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 6rem;
  padding-left: 2.6rem;

  background-color: ${({ theme }) => theme.color.grayscale.gray10};

  & > div {
    display: flex;
    align-items: center;
    gap: 0.9rem;

    cursor: pointer;

    & > P {
      font-weight: 400;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: -0.02em;
    }
  }
`;

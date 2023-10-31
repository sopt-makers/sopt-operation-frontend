import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import zIndex from '@/utils/zIndex';

export const StHeader = styled.header`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  position: fixed;
  z-index: ${zIndex.header};
  top: 0;
  left: 22rem;
  width: calc(100% - 22rem);
  height: 8rem;
  padding: 0 2.6rem;

  button {
    width: 10.2rem;
    padding: 0.3rem 0.6rem;

    color: ${colors.gray200};
    background-color: ${colors.gray800};

    border-radius: 1.9rem;

    cursor: pointer;

    &:hover {
      color: ${colors.gray10};
      background-color: ${colors.gray700};
    }
    &:active {
      background-color: ${colors.gray600};
    }

    & > p {
      text-align: center;
      font-family: SUIT;
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 600;
      line-height: 150%; /* 2.4rem */
      letter-spacing: -0.024rem;
    }
  }
`;

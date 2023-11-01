import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

import { Props } from './index';

export const DropdownWrapper = styled.div<Pick<Props, 'type'>>`
  position: absolute;

  top: 100%;

  width: 100%;
  min-width: 11rem;
  height: auto;
  margin-top: 1rem;
  padding: 0.8rem 0.7rem;

  box-shadow: 0px 5px 20px 0px rgba(63, 64, 66, 0.15);
  border-radius: 1.3rem;

  background-color: ${colors.gray500};

  z-index: 1;

  animation: appearDropdown 0.6s;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    max-height: auto;

    ${({ type }) =>
      type === 'times' &&
      css`
        max-height: 20rem;
        overflow-y: scroll; // 세로 스크롤만 허용
        overflow-x: hidden; // 가로 스크롤 숨기기

        ::-webkit-scrollbar {
          width: 0.6rem;
        }

        ::-webkit-scrollbar-thumb {
          background-color: ${colors.gray300};
          border-radius: 0.8rem;
        }
      `}

    & > p {
      padding: 0.75rem 0 0.75rem 0.5rem;

      color: ${colors.gray10};
      font-size: 1.6rem;
      font-style: normal;
      font-weight: 500;
      line-height: 100%; /* 1.6rem */
      letter-spacing: -0.016rem;

      border-radius: 0.6rem;

      &:hover {
        background-color: ${colors.gray400};

        cursor: pointer;
      }
    }
  }

  @keyframes appearDropdown {
    from {
      opacity: 0;
      transform: translateY(-1rem);
    }
    to {
      opacity: 1;
      transform: translateY(0rem);
    }
  }
`;

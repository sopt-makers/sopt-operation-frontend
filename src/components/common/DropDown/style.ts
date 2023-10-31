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
  max-height: 32.1rem;
  margin-top: 1rem;

  box-shadow: 0px 5px 20px 0px rgba(63, 64, 66, 0.15);
  border-radius: 1.3rem;

  ${({ type }) =>
    type === 'times' &&
    css`
      overflow: scroll;
    `}

  background-color: ${colors.gray500};

  z-index: 1;

  animation: appearDropdown 0.6s;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    padding: 0.7rem;

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

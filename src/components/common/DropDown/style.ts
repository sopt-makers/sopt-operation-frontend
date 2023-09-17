import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { Props } from './index';

export const DropdownWrapper = styled.div<Pick<Props, 'type'>>`
  position: absolute;
  top: 100%;

  width: 10rem;
  height: auto;
  max-height: 32.1rem;

  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 1.3rem;

  ${({ type }) =>
    type === 'times' &&
    css`
      margin-left: 9.3rem;
      overflow: scroll;
    `}

  background: ${({ theme }) => theme.color.grayscale.white100};

  z-index: 1;

  animation: appearDropdown 0.6s;
  & > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    padding: 0.7rem;

    & > p {
      padding: 0.75rem 0 0.75rem 0.5rem;

      color: ${({ theme }) => theme.color.grayscale.black60};
      font-weight: 500;
      font-size: 16px;
      line-height: 100%;
      letter-spacing: -0.01em;

      border-radius: 0.6rem;

      &:hover {
        background-color: ${({ theme }) => theme.color.grayscale.gray20};

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

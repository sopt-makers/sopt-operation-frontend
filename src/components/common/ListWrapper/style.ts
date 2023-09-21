import styled from '@emotion/styled';
import css from 'styled-jsx/css';

import { body2, caption1 } from '@/styles/fonts';

export const StList = styled.table<{ tableWidth: string[] }>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.6rem;
  thead > tr {
    ${caption1}
    font-weight: 400;
    color: ${({ theme }) => theme.color.grayscale.black40};
    opacity: 0.7;
    & > th {
      padding-bottom: 2.4rem;
    }
    ${({ tableWidth }) =>
      tableWidth &&
      tableWidth
        .map(
          (width, index) => `th:nth-of-type(${index + 1}) { width: ${width} }`,
        )
        .join('')}
  }
  tbody > tr {
    ${body2}
    height: 7rem;
    color: ${({ theme }) => theme.color.grayscale.black40};
    & > td {
      height: inherit;
      text-align: center;
      vertical-align: middle;
      background-color: ${({ theme }) => theme.color.grayscale.white100};
      border-top: 0.5px solid ${({ theme }) => theme.color.grayscale.gray30};
      border-bottom: 0.5px solid ${({ theme }) => theme.color.grayscale.gray30};
    }

    & > td:first-of-type {
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      border: 0.5px solid ${({ theme }) => theme.color.grayscale.gray30};
      border-right: none;
    }
    & > td:last-of-type {
      border-top-right-radius: 1rem;
      border-bottom-right-radius: 1rem;
      border: 0.5px solid ${({ theme }) => theme.color.grayscale.gray30};
      border-left: none;

      & > span {
        transition: transform 0.1s;
        display: inline-block;

        padding: 0.5rem 0.9rem;
        border: 0.1rem solid ${({ theme }) => theme.color.grayscale.gray60};
        border-radius: 1.6rem;
        background-color: ${({ theme }) => theme.color.grayscale.gray20};
        color: ${({ theme }) => theme.color.grayscale.black40};

        cursor: pointer;
        &:hover {
          transform: scale(1.15);
          border-color: ${({ theme }) => theme.color.grayscale.gray100};
        }
      }
    }
  }
  .focused > td,
  .focused > td:first-of-type,
  .focused > td:last-of-type {
    border-color: ${({ theme }) => theme.color.grayscale.black40};
    border-width: 1px;
  }
`;

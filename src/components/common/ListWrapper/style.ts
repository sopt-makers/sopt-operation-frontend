import styled from '@emotion/styled';
import css from 'styled-jsx/css';

export const StList = styled.table<{ tableWidth: string[] }>`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 1.6rem;
  thead > tr {
    font-size: 1.2rem;
    line-height: 1.5rem;
    font-weight: 500;
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
    font-size: 1.4rem;
    line-height: 2rem;
    font-weight: 500;
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
    }
  }
  .focused > td,
  .focused > td:first-of-type,
  .focused > td:last-of-type {
    border-color: ${({ theme }) => theme.color.grayscale.black40};
    border-width: 1px;
  }
`;

import styled from '@emotion/styled';

export const StListHeader = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;

  & > h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.color.grayscale.black60};
  }
`;

export const StTbody = styled.tbody`
  cursor: pointer;

  & > tr {
    &:hover {
      & > td {
        border-top: 1px solid ${({ theme }) => theme.color.grayscale.black40};
        border-bottom: 1px solid ${({ theme }) => theme.color.grayscale.black40};
      }
      & > td:first-of-type {
        border: 1px solid ${({ theme }) => theme.color.grayscale.black40};
        border-right: none;
      }
      & > td:last-of-type {
        border: 1px solid ${({ theme }) => theme.color.grayscale.black40};
        border-left: none;
      }
    }
  }
`;

export const IndicatorStructure = styled.span`
  display: inline-block;
  min-width: 4.9rem;
  padding: 0.4rem 0.6rem;
  text-align: center;
  vertical-align: middle;
  color: ${({ theme }) => theme.color.grayscale.white100};
  border-radius: 0.4rem;
`;

export const StPartIndicator = styled(IndicatorStructure)`
  background-color: ${({ theme }) => theme.color.grayscale.gray100};
`;

export const StSessionIndicator = styled(IndicatorStructure)<{
  attributeName: string;
}>`
  color: ${({ theme, attributeName }) =>
    attributeName === '기타'
      ? theme.color.grayscale.black60
      : theme.color.grayscale.white100};
  background-color: ${({ theme, attributeName }) =>
    attributeName === '세미나'
      ? theme.color.grayscale.black100
      : attributeName === '행사'
      ? theme.color.grayscale.black40
      : theme.color.grayscale.gray40};
`;

export const StSessionName = styled.p`
  max-width: 17rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

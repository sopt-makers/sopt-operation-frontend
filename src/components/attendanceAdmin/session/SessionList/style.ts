import styled from '@emotion/styled';

export const SessionInfo = styled.tr`
  & > td:first-of-type {
    width: 11%;
  }
  & > td.indicator {
    width: 6.25%;
  }
  & > td:nth-of-type(4) {
    width: 24%;
  }
  & > td:nth-of-type(5) {
    width: 14%;
  }
  & > td.attendance {
    width: 6.5%;
  }
  & > td:last-of-type {
    width: 14.5%;
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
  background-color: ${({ theme, attributeName }) =>
    attributeName === '세미나'
      ? theme.color.main.purple100
      : attributeName === '행사'
      ? theme.color.main.purple40
      : theme.color.main.purpledim100};
`;

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

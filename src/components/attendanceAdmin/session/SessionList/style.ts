import styled from '@emotion/styled';

export const Indicator = styled.span`
  padding: 0.4rem 1.1rem;
  color: ${({ theme }) => theme.color.grayscale.white100};
  border-radius: 0.4rem;
`;

export const StPartIndicator = styled(Indicator)`
  background-color: ${({ theme }) => theme.color.grayscale.gray100};
`;

export const StSessionIndicator = styled(Indicator)`
  background-color: ${({ theme }) => theme.color.main.purple100};
`;

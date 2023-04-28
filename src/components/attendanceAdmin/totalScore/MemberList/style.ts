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

export const StMemberName = styled.p`
  max-width: 7.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

export const StMemberUniversity = styled.p`
  max-width: 7.6rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 auto;
`;

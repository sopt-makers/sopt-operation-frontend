import styled from '@emotion/styled';

export const StInput = styled.input`
  width: 100%;
  height: 100%;

  padding: 1rem 1.4rem;

  color: ${({ theme }) => theme.color.grayscale.black40};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;

  border: none;

  border-radius: 8px;

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale.gray30};
  }
  &:focus {
    outline: ${({ theme }) => theme.color.main.purple100} solid 1px;
  }
`;

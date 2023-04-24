import styled from '@emotion/styled';

export const StLayout = styled.input`
  width: 100%;
  height: 100%;
  padding: 1rem 1.4rem;
  color: ${({ theme }) => theme.color.grayscale.black40};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grayscale.black40};
  outline: none;
  transition: border-color 0.2s ease-in-out;

  &:focus {
    border-color: #4a90e2;
  }

  &::placeholder {
    color: ${({ theme }) => theme.color.grayscale.black40};
  }
`;

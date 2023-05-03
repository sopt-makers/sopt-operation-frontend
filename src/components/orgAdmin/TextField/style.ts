import styled from '@emotion/styled';

interface StyledTextAreaProps {
  multiline: boolean;
}

export const StLayout = styled.textarea<StyledTextAreaProps>`
  width: 100%;
  height: 100%;
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.color.grayscale.black40};
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.02em;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.color.grayscale.black40};
  outline: none;
  transition: border-color 0.2s ease-in-out;
  overflow: ${({ multiline }) => (multiline ? 'auto' : 'hidden')};
  white-space: ${({ multiline }) => (multiline ? 'normal' : 'nowrap')};
  resize: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    border-color: #4a90e2;
  }

  &::placeholder {
    color: grey;
  }
`;

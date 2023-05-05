import styled from '@emotion/styled';
import { CSSProperties } from 'react';

interface StyledTextAreaProps {
  multiline: boolean;
  height?: CSSProperties['height'];
  hasValue: boolean;
}

export const StTextField = styled.textarea<StyledTextAreaProps>`
  width: 100%;
  height: ${({ height }) => height};
  padding: 1rem 1rem;
  color: ${({ theme }) => theme.color.grayscale.black40};
  font-weight: 400;
  font-size: 16px;
  letter-spacing: -0.02em;
  border-radius: 8px;
  border: ${({ hasValue, theme }) =>
    hasValue
      ? `1px solid ${theme.color.grayscale.black40}`
      : `1px solid ${theme.color.grayscale.gray30}`};
  outline: none;
  transition: border-color 0.2s ease-in-out;
  overflow: ${({ multiline }) => (multiline ? 'auto' : 'hidden')};
  white-space: ${({ multiline }) => (multiline ? 'normal' : 'nowrap')};
  resize: none;
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    border: 1px solid ${({ theme }) => theme.color.main.purple100};
  }

  &::placeholder {
    color: grey;
  }
`;

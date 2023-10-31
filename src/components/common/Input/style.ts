import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StInput = styled.input`
  padding: 1rem 1.4rem;

  font-size: 1.8rem;
  font-style: normal;
  font-weight: 500;
  line-height: 100%; /* 1.8rem */
  letter-spacing: -0.018rem;

  color: ${colors.gray10};
  background-color: ${colors.gray700};
  border: none;
  outline: none;

  border-radius: 0.8rem;

  &::placeholder {
    color: ${colors.gray400};
  }

  &:focus {
    background-color: ${colors.gray600};
    outline: 0.1rem solid ${colors.gray300};
  }
`;

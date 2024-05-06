import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StInput = styled.input`
  padding: 1rem 1.4rem;

  ${fontsObject.LABEL_1_18_SB}

  color: ${colors.gray10};
  background-color: ${colors.gray700};
  border: none;
  outline: none;

  border-radius: 0.8rem;

  &::placeholder {
    color: ${colors.gray400};
  }

  &:not(:read-only):focus {
    background-color: ${colors.gray600};
    outline: 0.1rem solid ${colors.gray300};
  }
  &:read-only {
    cursor: default;
  }
`;

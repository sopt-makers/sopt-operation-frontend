import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StButton = styled.button`
  text-align: center;
  font-size: 1.4rem;
  font-style: normal;
  font-weight: 500;
  line-height: 140%; /* 1.96rem */
  letter-spacing: -0.028rem;
  transition: transform 0.1s;

  display: inline-block;

  padding: 0.6rem 1rem;
  border: 0.1rem solid ${colors.gray300};
  border-radius: 0.8rem;
  background-color: ${colors.gray600};
  color: ${colors.gray10};

  &:disabled {
    background-color: ${colors.gray800};
    border: none;
    color: ${colors.gray500};
    cursor: default;
  }
  cursor: pointer;
  &:not(:disabled):hover {
    transform: scale(1.15);
  }
`;

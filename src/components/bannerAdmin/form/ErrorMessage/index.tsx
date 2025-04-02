import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const ErrorMessage = styled.span`
  display: inline-block;
  font-size: 12px;
  font-weight: 500;
  line-height: 100%;

  color: ${colors.error};
`;

export default ErrorMessage;

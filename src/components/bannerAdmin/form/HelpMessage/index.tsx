import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { PropsWithChildren } from 'react';

const HelpMessage = ({ children }: PropsWithChildren) => {
  return <SHelpMessage>{children}</SHelpMessage>;
};

export default HelpMessage;

export const SHelpMessage = styled.span`
  margin-bottom: 8px;
  display: inline-block;
  ${fontsObject.LABEL_4_12_SB};
  color: ${colors.gray300};
`;

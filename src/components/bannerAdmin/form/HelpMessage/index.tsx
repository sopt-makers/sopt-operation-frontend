import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import React from 'react';

interface HelpMessageProps {
  children?: React.ReactNode;
}

const HelpMessage = ({ children }: HelpMessageProps) => {
  return <SHelpMessage>{children}</SHelpMessage>;
};

export default HelpMessage;

export const SHelpMessage = styled.span`
  margin-bottom: 8px;
  display: inline-block;
  ${fontsObject.LABEL_4_12_SB};
  color: ${colors.gray300};
`;

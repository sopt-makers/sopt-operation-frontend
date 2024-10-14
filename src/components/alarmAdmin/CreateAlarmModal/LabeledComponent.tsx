import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';
import { colors } from '@sopt-makers/colors';

interface LabelProps {
  labelText: string;
  desc?: string;
  children?: ReactNode;
}

function LabeledComponent({ labelText, desc, children }: LabelProps) {
  return (
    <LabeledComponentWrapper>
      <LabelWrapper>
        <LabelText>{labelText}</LabelText>
        <RequiredStar>*</RequiredStar>
      </LabelWrapper>
      {desc && (
        <DescWrapper>
          <DescText>{desc}</DescText>
        </DescWrapper>
      )}
      {children}
    </LabeledComponentWrapper>
  );
}

export default LabeledComponent;

const LabeledComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.label`
  display: flex;
  gap: 0.4rem;
`;

const DescWrapper = styled.label`
  margin: 0.8rem 0;
`;

const DescText = styled.span`
  ${fontsObject.LABEL_4_12_SB}
  color: ${colors.gray300};
`;

const LabelText = styled.span`
  ${fontsObject.LABEL_3_14_SB}
  color: ${colors.white};
`;

const RequiredStar = styled.span`
  ${fontsObject.LABEL_3_14_SB}
  color: ${colors.secondary};
`;

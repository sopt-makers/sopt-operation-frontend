import React from 'react';

import { StInput } from '../style';
import { StSNSBox } from './style';

interface SNSInputProps {
  icon: React.FC;
  placeholder: string;
}
const SNSInput = ({ icon: Icon, placeholder }: SNSInputProps) => {
  return (
    <li>
      <StSNSBox>
        <Icon />
        <StInput placeholder={placeholder} value={''} />
      </StSNSBox>
    </li>
  );
};

export default SNSInput;

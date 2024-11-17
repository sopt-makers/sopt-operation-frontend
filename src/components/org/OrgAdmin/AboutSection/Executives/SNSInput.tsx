import React from 'react';

import { StInput } from '../style';
import { StSNSBox } from './style';

interface SNSInputProps {
  label: string;
  icon: React.FC;
  placeholder: string;
}
const SNSInput = ({ label, icon: Icon, placeholder }: SNSInputProps) => {
  return (
    <StSNSBox>
      <label htmlFor={label}>
        <Icon />
      </label>
      <StInput placeholder={placeholder} value={''} id={label} />
    </StSNSBox>
  );
};

export default SNSInput;

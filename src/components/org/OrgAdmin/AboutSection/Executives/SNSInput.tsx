import React, { ChangeEventHandler } from 'react';

import { StInput } from '../style';
import { StSNSBox } from './style';

interface SNSInputProps {
  label: string;
  icon: React.FC;
  placeholder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}
const SNSInput = ({
  label,
  icon: Icon,
  placeholder,
  value,
  onChange,
}: SNSInputProps) => {
  return (
    <StSNSBox>
      <label htmlFor={label}>
        <Icon />
      </label>
      <StInput
        placeholder={placeholder}
        id={label}
        value={value}
        onChange={onChange}
      />
    </StSNSBox>
  );
};

export default SNSInput;

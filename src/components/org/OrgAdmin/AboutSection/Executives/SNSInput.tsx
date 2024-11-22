import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { StInput } from '../style';
import { StSNSBox } from './style';

interface SNSInputProps {
  method: UseFormReturn;
  label: string;
  icon: React.FC;
  placeholder: string;
}
const SNSInput = ({
  method,
  label,
  icon: Icon,
  placeholder,
}: SNSInputProps) => {
  const { register } = method;
  return (
    <StSNSBox>
      <label htmlFor={label}>
        <Icon />
      </label>
      <StInput {...register(label)} placeholder={placeholder} id={label} />
    </StSNSBox>
  );
};

export default SNSInput;

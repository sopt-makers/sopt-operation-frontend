import React from 'react';
import { useFormContext } from 'react-hook-form';

import { StInput } from '../style';
import { StSNSBox } from './style';

interface SNSInputProps {
  label: string;
  icon: React.FC;
  placeholder: string;
}
const SNSInput = ({ label, icon: Icon, placeholder }: SNSInputProps) => {
  const { register } = useFormContext();
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

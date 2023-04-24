import React from 'react';
import { StLayout } from '@/components/orgAdmin/TextField/style';

type CustomTextFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const TextField = ({ label, onChange, value }: CustomTextFieldProps) => {
  return (
    <StLayout
      type="text"
      placeholder={label}
      onChange={onChange}
      value={value}
    />
  );
};

export default TextField;

import React, { KeyboardEvent } from 'react';
import { StLayout } from '@/components/orgAdmin/TextField/style';

type CustomTextFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  multiline?: boolean;
};

const TextField = ({
  label,
  onChange,
  value,
  multiline = false,
}: CustomTextFieldProps) => {
  return (
    <StLayout
      type="text"
      placeholder={label}
      onChange={onChange}
      value={value}
      onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (multiline === false) {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }
      }}
    />
  );
};

export default TextField;

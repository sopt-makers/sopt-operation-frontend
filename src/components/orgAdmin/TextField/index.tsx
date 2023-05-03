import React, { KeyboardEvent } from 'react';

import { StLayout } from '@/components/orgAdmin/TextField/style';

type CustomTextFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  multiline?: boolean;
};

const TextField = (props: CustomTextFieldProps) => {
  const { label, onChange, value, multiline = false } = props;
  return (
    <StLayout
      multiline={multiline}
      placeholder={label}
      onChange={onChange}
      value={value}
      onKeyDown={(event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!multiline) {
          if (event.key === 'Enter') {
            event.preventDefault();
          }
        }
      }}
    />
  );
};

export default TextField;

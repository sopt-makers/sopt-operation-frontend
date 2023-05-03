import React, { CSSProperties, KeyboardEvent } from 'react';

import { StLayout } from '@/components/orgAdmin/TextField/style';

type CustomTextFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  multiline?: boolean;
  height?: CSSProperties['height'];
};

const TextField = (props: CustomTextFieldProps) => {
  const { label, onChange, value, multiline = false, height = '100%' } = props;
  return (
    <StLayout
      height={height}
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

import React, { CSSProperties, KeyboardEvent, useEffect } from 'react';

import { StTextField } from '@/components/orgAdmin/TextField/style';

type CustomTextFieldProps = {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  multiline?: boolean;
  height?: CSSProperties['height'];
};

function TextField(props: CustomTextFieldProps) {
  const { label, onChange, value, multiline = false, height = '100%' } = props;
  const [hasValue, setHasValue] = React.useState(value !== '');

  useEffect(() => {
    if (value && value !== '') {
      return setHasValue(true);
    }
    setHasValue(false);
  }, [value]);

  return (
    <StTextField
      hasValue={hasValue}
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
}

export default TextField;

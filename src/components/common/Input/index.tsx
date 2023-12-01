import { ChangeEvent, ChangeEventHandler } from 'react';

import { StInput } from './style';

interface Props {
  type: string;
  placeholder?: string;
  value?: string;
  readOnly?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: Props) {
  const { type, placeholder, value, readOnly = false, onChange } = props;

  return (
    <StInput
      type={type}
      placeholder={placeholder}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
    />
  );
}

export default Input;

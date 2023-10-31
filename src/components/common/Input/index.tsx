import { ChangeEvent, ChangeEventHandler } from 'react';

import { StInput } from './style';

interface Props {
  type: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

function Input(props: Props) {
  const { type, placeholder, value, onChange } = props;

  return (
    <StInput
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;

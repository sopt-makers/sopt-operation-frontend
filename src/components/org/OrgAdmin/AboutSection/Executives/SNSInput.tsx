import React from 'react';
import { useFormContext } from 'react-hook-form';

import { StInput } from '../style';
import { StSNSBox } from './style';

const URL_PATTERN_MESSAGE =
  'http:// 또는 https://로 시작하는 URL을 입력해주세요.';

interface SNSInputProps {
  label: string;
  icon: React.FC;
  placeholder: string;
  disabled?: boolean;
  validateUrl?: boolean;
}
const SNSInput = ({
  label,
  icon: Icon,
  placeholder,
  disabled,
  validateUrl,
}: SNSInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage = label
    .split('.')
    .reduce<any>((acc, key) => acc?.[key], errors)?.message as
    | string
    | undefined;

  return (
    <StSNSBox>
      <label htmlFor={label}>
        <Icon />
      </label>
      <StInput
        {...register(label, {
          validate: validateUrl
            ? (value: string) =>
                !value || /^https?:\/\/.*/.test(value) || URL_PATTERN_MESSAGE
            : undefined,
        })}
        placeholder={placeholder}
        id={label}
        disabled={disabled}
        isError={errorMessage !== undefined}
        errorMessage={errorMessage}
      />
    </StSNSBox>
  );
};

export default SNSInput;

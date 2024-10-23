import type { FieldValues, UseFormRegister } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import {
  StColorPreview,
  StColorWrapper,
  StInput,
  StInputBox,
  StInputLabel,
} from './style';
import { expandHexColor } from './utils';

interface ColorInputFieldProps {
  label: string;
  id: string;
  colorValue: string;
  onSetColorValue: (value: string) => void;
  register: UseFormRegister<FieldValues>;
  error?: string;
}

const ColorInputField = ({
  label,
  id,
  colorValue,
  onSetColorValue,
  register,
  error,
}: ColorInputFieldProps) => {
  return (
    <StInputBox>
      <StInputLabel htmlFor={id}>{label}</StInputLabel>
      <StColorWrapper>
        <StInput
          {...register(id, {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          id={id}
          type="text"
          placeholder="ex. #ffffff"
          value={colorValue}
          onChange={(e) => onSetColorValue(e.target.value)}
          isError={error != undefined}
          errorMessage={error as string}
        />
        <StColorPreview
          type="color"
          value={expandHexColor(colorValue)}
          onChange={(e) => onSetColorValue(e.target.value)}
        />
      </StColorWrapper>
    </StInputBox>
  );
};

export default ColorInputField;

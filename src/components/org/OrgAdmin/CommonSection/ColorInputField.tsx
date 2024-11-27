import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StInput } from '../style';
import { StColorPreview, StColorWrapper } from './style';
import { expandHexColor } from './utils';

interface ColorInputFieldProps {
  label: string;
  id: string;
  colorValue: string;
  onSetColorValue: (value: string) => void;
}

const ColorInputField = ({
  label,
  id,
  colorValue,
  onSetColorValue,
}: ColorInputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StColorWrapper>
      <StInput
        {...register(id, {
          required: true && VALIDATION_CHECK.required.errorText,
        })}
        required
        labelText={label}
        id={id}
        type="text"
        maxLength={9}
        placeholder="ex. #ffffff"
        value={colorValue}
        onChange={(e) => onSetColorValue(e.target.value)}
        isError={errors[id]?.message != undefined}
        errorMessage={errors[id]?.message as string}
      />
      <StColorPreview
        type="color"
        value={expandHexColor(colorValue)}
        onChange={(e) => onSetColorValue(e.target.value)}
      />
    </StColorWrapper>
  );
};

export default ColorInputField;

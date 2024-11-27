import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StInput } from '../style';
import { StColorPreview, StColorWrapper } from './style';
import { expandHexColor } from './utils';

interface ColorInputFieldProps {
  label: string;
  id: string;
}

const ColorInputField = ({ label, id }: ColorInputFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
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
        isError={errors[id]?.message != undefined}
        errorMessage={errors[id]?.message as string}
      />
      <StColorPreview
        type="color"
        value={expandHexColor(watch(id))}
        onChange={(e) => setValue(id, e.target.value)}
      />
    </StColorWrapper>
  );
};

export default ColorInputField;

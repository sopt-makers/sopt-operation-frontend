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
  const [brandingColor, color] = id.split('.');

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
        maxLength={8}
        placeholder="ex. ffffff"
        isError={!!(errors as any)[brandingColor]?.[color]?.message}
        errorMessage={
          (errors as any)[brandingColor]?.[color]?.message as string
        }
      />
      <StColorPreview
        type="color"
        value={expandHexColor(watch(id))}
        onChange={(e) => setValue(id, e.target.value.replace('#', ''))}
      />
    </StColorWrapper>
  );
};

export default ColorInputField;

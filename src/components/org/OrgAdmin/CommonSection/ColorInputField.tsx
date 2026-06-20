import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import RequiredIcon from '../assets/RequiredIcon';
import { StInput, StInputBox } from '../style';
import {
  StColorPreviewInline,
  StColorRow,
  StSubColorDescription,
  StSubColorTitle,
} from './style';
import { expandHexColor } from './utils';

interface ColorInputFieldProps {
  label: string;
  id: string;
  description?: string;
  previewDefaultColor?: string;
}

const ColorInputField = ({
  label,
  id,
  description,
  previewDefaultColor = '#ffffff',
}: ColorInputFieldProps) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const [brandingColor, color] = id.split('.');
  const currentValue = watch(id);
  const previewColor = currentValue
    ? expandHexColor(currentValue)
    : previewDefaultColor;

  return (
    <StInputBox>
      <StSubColorTitle htmlFor={id}>
        <span>{label}</span>
        <RequiredIcon />
      </StSubColorTitle>
      {description && (
        <StSubColorDescription>{description}</StSubColorDescription>
      )}
      <StColorRow>
        <StInput
          {...register(id, {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          required
          id={id}
          type="text"
          maxLength={8}
          placeholder="ex. ffffff"
          isError={!!(errors as any)[brandingColor]?.[color]?.message}
          errorMessage={
            (errors as any)[brandingColor]?.[color]?.message as string
          }
        />
        <StColorPreviewInline
          type="color"
          value={previewColor}
          onChange={(e) =>
            setValue(id, e.target.value.replace('#', ''), {
              shouldDirty: true,
              shouldValidate: true,
            })
          }
        />
      </StColorRow>
    </StInputBox>
  );
};

export default ColorInputField;

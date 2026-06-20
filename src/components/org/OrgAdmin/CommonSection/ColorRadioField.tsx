import { fontsObject } from '@sopt-makers/fonts';
import { Radio } from '@sopt-makers/ui';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import RequiredIcon from '../assets/RequiredIcon';
import { StInputBox } from '../style';
import {
  StRadioOptions,
  StRadioRow,
  StSubColorDescription,
  StSubColorTitle,
  StTextPreviewBox,
} from './style';
import { expandHexColor } from './utils';

interface ColorRadioFieldProps {
  label: string;
  description: string;
  id: string;
  /** 배경색으로 사용할 키컬러 필드 ID */
  keyColorId: string;
  /** 키컬러가 비어 있을 때 미리보기 배경색 */
  previewDefaultColor?: string;
  /** 초기 선택값 */
  defaultValue?: 'dark' | 'light';
  /** true이면 밝은 텍스트 옵션에 "(권장)" 표시 */
  lightRecommended?: boolean;
}

const ColorRadioField = ({
  label,
  description,
  id,
  keyColorId,
  previewDefaultColor = '#ffffff',
  defaultValue,
  lightRecommended,
}: ColorRadioFieldProps) => {
  const { control } = useFormContext();
  const selectedValue = useWatch({
    control,
    name: id,
    defaultValue: defaultValue ?? '',
  }) as 'dark' | 'light' | '';

  const currentKeyColor = useWatch({
    control,
    name: keyColorId,
  }) as string;

  const lightTextLabel = lightRecommended
    ? '밝은 텍스트 (권장)'
    : '밝은 텍스트';

  const keyColor = currentKeyColor
    ? expandHexColor(currentKeyColor)
    : previewDefaultColor;
  const previewTextColor = selectedValue === 'light' ? '#ffffff' : '#000000';

  return (
    <StInputBox>
      <StSubColorTitle>
        <span>{label}</span>
        <RequiredIcon />
      </StSubColorTitle>
      <StSubColorDescription>{description}</StSubColorDescription>
      <StRadioRow>
        <StRadioOptions>
          <Controller
            name={id}
            control={control}
            defaultValue={defaultValue ?? ''}
            rules={{ required: VALIDATION_CHECK.required.errorText }}
            render={({ field }) => (
              <>
                <Radio
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange('dark')}
                  checked={field.value === 'dark'}
                  label="어두운 텍스트"
                  value="dark"
                />
                <Radio
                  name={field.name}
                  ref={field.ref}
                  onBlur={field.onBlur}
                  onChange={() => field.onChange('light')}
                  checked={field.value === 'light'}
                  label={lightTextLabel}
                  value="light"
                />
              </>
            )}
          />
        </StRadioOptions>
        <StTextPreviewBox bgColor={keyColor} textColor={previewTextColor}>
          가
        </StTextPreviewBox>
      </StRadioRow>
    </StInputBox>
  );
};

export default ColorRadioField;

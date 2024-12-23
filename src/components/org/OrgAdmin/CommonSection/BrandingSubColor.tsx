import { IconInfoCircle } from '@sopt-makers/icons';
import { type MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StInput, StInputBox } from '../style';
import { StColorPreview, StColorWrapper, StInfoButton } from './style';
import { expandHexColor } from './utils';

const BrandingSubColor = ({
  onInfoToggle,
}: {
  onInfoToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  return (
    <StInputBox>
      <StColorWrapper>
        <StInfoButton onClick={onInfoToggle}>
          <IconInfoCircle />
        </StInfoButton>
        <StInput
          {...register('brandingColor.point', {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          required
          labelText="서브 컬러 (강조 그레이 컬러)"
          descriptionText="강조하고 싶은 박스의 그레이 컬러를 지정해주세요."
          id="sub-color"
          type="text"
          maxLength={9}
          placeholder="ex. #ffffff"
          isError={!!(errors as any).brandingColor?.point?.message}
          errorMessage={(errors as any).brandingColor?.point?.message as string}
        />
        <StColorPreview
          type="color"
          value={expandHexColor(watch('brandingColor.point'))}
          onChange={(e) => setValue('brandingColor.point', e.target.value)}
        />
      </StColorWrapper>
    </StInputBox>
  );
};

export default BrandingSubColor;

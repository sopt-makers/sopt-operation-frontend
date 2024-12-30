import { IconInfoCircle } from '@sopt-makers/icons';
import { type MouseEvent } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StInputLabel } from '../AboutSection/style';
import RequiredIcon from '../assets/RequiredIcon';
import { StInput, StInputBox } from '../style';
import {
  StColorWrapper,
  StInfoButton,
  StSubColorDescription,
  StSubColorPreview,
} from './style';
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
        <StInputLabel>
          <span>서브 컬러 (강조 그레이 컬러)</span>
          <RequiredIcon />
        </StInputLabel>
        <StSubColorDescription>
          강조하고 싶은 박스의 그레이 컬러를 지정해주세요.
        </StSubColorDescription>
        <StInfoButton onClick={onInfoToggle}>
          <IconInfoCircle />
        </StInfoButton>
        <StInput
          {...register('brandingColor.point', {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          required
          id="sub-color"
          type="text"
          maxLength={8}
          placeholder="ex. ffffff"
          isError={!!(errors as any).brandingColor?.point?.message}
          errorMessage={(errors as any).brandingColor?.point?.message as string}
        />
        <StSubColorPreview
          type="color"
          value={expandHexColor(watch('brandingColor.point'))}
          onChange={(e) =>
            setValue('brandingColor.point', e.target.value.replace('#', ''))
          }
        />
      </StColorWrapper>
    </StInputBox>
  );
};

export default BrandingSubColor;

import { IconInfoCircle } from '@sopt-makers/icons';
import { type MouseEvent, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StInput, StInputBox } from '../style';
import {
  StColorPreview,
  StColorWrapper,
  StInfoButton,
  StInfoCloseButton,
  StInfoDescription,
  StInfoImg,
  StInfoSubDescription,
  StInfoTitle,
  StInfoWrapper,
} from './style';
import { expandHexColor } from './utils';

const BrandingSubColor = () => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const handleInfoToggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsInfoVisible((prev) => !prev);
  };

  return (
    <StInputBox>
      <StColorWrapper>
        <StInfoButton onClick={handleInfoToggle}>
          <IconInfoCircle />
        </StInfoButton>
        <StInput
          {...register('brandingColor_point', {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          required
          labelText="서브 컬러 (강조 그레이 컬러)"
          descriptionText="강조하고 싶은 박스의 그레이 컬러를 지정해주세요."
          id="sub-color"
          type="text"
          maxLength={9}
          placeholder="ex. #ffffff"
          isError={errors.brandingColor_point?.message != undefined}
          errorMessage={errors.brandingColor_point?.message as string}
        />
        <StColorPreview
          type="color"
          value={expandHexColor(watch('brandingColor_point'))}
          onChange={(e) => setValue('brandingColor_point', e.target.value)}
        />
        <StInfoWrapper isVisible={isInfoVisible}>
          <StInfoTitle>
            <span>&#9432; 서브컬러 (강조 그레이 컬러) 예시</span>
            <StInfoCloseButton onClick={handleInfoToggle}>
              &#10005;
            </StInfoCloseButton>
          </StInfoTitle>
          <StInfoDescription>
            &#39;지원하기&#39; 탭 속 파트별 소개 &#39;👍이런 분이면
            좋아요!&#39;의 백그라운 컬러예요.
          </StInfoDescription>
          <StInfoSubDescription>
            키컬러 저명도와 그레이 컬러 사이, 컬러를 지정해주세요.
          </StInfoSubDescription>
          <StInfoImg
            src="/images/org/imgSubColorInfo.png"
            alt="서브 컬러가 적용되는 예시 이미지"
            width={434}
            height={293}
          />
        </StInfoWrapper>
      </StColorWrapper>
    </StInputBox>
  );
};

export default BrandingSubColor;

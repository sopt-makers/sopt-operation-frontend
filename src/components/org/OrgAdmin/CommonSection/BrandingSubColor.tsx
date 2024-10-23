import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import { StDescription, StInput, StInputBox, StInputLabel } from '../style';
import {
  StColorPreview,
  StColorWrapper,
  StInfoButton,
  StInfoCloseButton,
  StInfoDescription,
  StInfoSubDescription,
  StInfoTitle,
  StInfoWrapper,
} from './style';
import { expandHexColor } from './utils';

interface BrandingSubColorProps {
  subGrayColor: string;
  onSetSubGrayColor: (color: string) => void;
}

const BrandingSubColor = ({
  subGrayColor,
  onSetSubGrayColor,
}: BrandingSubColorProps) => {
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const handleInfoToggle = () => {
    setIsInfoVisible((prev) => !prev);
  };

  return (
    <StInputBox>
      <StInputLabel as={'p'}>
        <label htmlFor="sub-color">서브 컬러 (강조 그레이 컬러)</label>
        <StInfoButton onClick={handleInfoToggle}>&nbsp;&#9432;</StInfoButton>
      </StInputLabel>
      <StDescription>
        강조하고 싶은 박스의 그레이 컬러를 지정해주세요.
      </StDescription>
      <StColorWrapper>
        <StInput
          {...register('subColor', {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          id="sub-color"
          type="text"
          placeholder="ex. #ffffff"
          value={subGrayColor}
          onChange={(e) => onSetSubGrayColor(e.target.value)}
          isError={errors.subColor?.message != undefined}
          errorMessage={errors.subColor?.message as string}
        />
        <StColorPreview
          type="color"
          value={expandHexColor(subGrayColor)}
          onChange={(e) => onSetSubGrayColor(e.target.value)}
        />
        <StInfoWrapper isVisible={isInfoVisible}>
          <StInfoTitle>
            <span>&#9432; 서브컬러 (강조 그레이 컬러) 예시</span>
            <StInfoCloseButton onClick={handleInfoToggle}>
              &#10005;
            </StInfoCloseButton>
          </StInfoTitle>
          <StInfoDescription>
            &#39;지원하기 &#39; 탭 속 파트별 소개 &#39;👍이런 분이면
            좋아요!&#39;의 백그라운 컬러예요.
          </StInfoDescription>
          <StInfoSubDescription>
            키컬러 저명도와 그레이 컬러 사이, 컬러를 지정해주세요.
          </StInfoSubDescription>
          <img
            src="../assets/imgSubColorInfo.png"
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

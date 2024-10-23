import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import BrandingSubColor from './BrandingSubColor';
import {
  StColorPreview,
  StColorWrapper,
  StDescription,
  StInput,
  StInputBox,
  StInputLabel,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from './style';

const BrandingColor = () => {
  const [mainColor, setMainColor] = useState('');
  const [lowColor, setLowColor] = useState('');
  const [highColor, setHighColor] = useState('');
  const [subGrayColor, setSubGrayColor] = useState('');

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>브랜딩 컬러</StTitle>
        <StDescription>다크 모드를 고려하여 선정해주세요.</StDescription>
      </StTitleWrapper>
      <StInputWrapper>
        <StInputBox>
          <StInputLabel htmlFor="key-color-main">키컬러 (메인)</StInputLabel>
          <StColorWrapper>
            <StInput
              {...register('keyColorMain', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="key-color-main"
              type="text"
              placeholder="ex. #ffffff"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
              isError={errors.keyColorMain?.message != undefined}
              errorMessage={errors.keyColorMain?.message as string}
            />
            <StColorPreview style={{ backgroundColor: mainColor }} />
          </StColorWrapper>
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="key-color-low">키컬러 (저명도)</StInputLabel>
          <StColorWrapper>
            <StInput
              {...register('keyColorLow', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="key-color-low"
              type="text"
              placeholder="ex. #ffffff"
              value={lowColor}
              onChange={(e) => setLowColor(e.target.value)}
              isError={errors.keyColorLow?.message != undefined}
              errorMessage={errors.keyColorLow?.message as string}
            />
            <StColorPreview style={{ backgroundColor: lowColor }} />
          </StColorWrapper>
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="key-color-high">키컬러 (고명도)</StInputLabel>
          <StColorWrapper>
            <StInput
              {...register('keyColorHigh', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="key-color-high"
              type="text"
              placeholder="ex. #ffffff"
              value={highColor}
              onChange={(e) => setHighColor(e.target.value)}
              isError={errors.keyColorHigh?.message != undefined}
              errorMessage={errors.keyColorHigh?.message as string}
            />
            <StColorPreview style={{ backgroundColor: highColor }} />
          </StColorWrapper>
        </StInputBox>
        <BrandingSubColor
          subGrayColor={subGrayColor}
          onSetSubGrayColor={(color) => setSubGrayColor(color)}
        />
      </StInputWrapper>
    </StWrapper>
  );
};

export default BrandingColor;

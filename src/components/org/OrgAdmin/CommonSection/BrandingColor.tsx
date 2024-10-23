import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import BrandingSubColor from './BrandingSubColor';
import ColorInputField from './ColorInputField';
import {
  StDescription,
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
        <ColorInputField
          label="키컬러 (메인)"
          id="keyColorMain"
          colorValue={mainColor}
          onSetColorValue={(val: string) => setMainColor(val)}
          register={register}
          error={errors.keyColorMain?.message as string}
        />
        <ColorInputField
          label="키컬러 (저명도)"
          id="keyColorLow"
          colorValue={lowColor}
          onSetColorValue={(val: string) => setLowColor(val)}
          register={register}
          error={errors.keyColorLow?.message as string}
        />
        <ColorInputField
          label="키컬러 (고명도)"
          id="keyColorHigh"
          colorValue={highColor}
          onSetColorValue={(val: string) => setHighColor(val)}
          register={register}
          error={errors.keyColorHigh?.message as string}
        />
        <BrandingSubColor
          subGrayColor={subGrayColor}
          onSetSubGrayColor={setSubGrayColor}
        />
      </StInputWrapper>
    </StWrapper>
  );
};

export default BrandingColor;

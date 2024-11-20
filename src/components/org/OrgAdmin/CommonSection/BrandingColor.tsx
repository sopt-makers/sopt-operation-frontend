import { useState } from 'react';

import {
  StDescription,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import BrandingSubColor from './BrandingSubColor';
import ColorInputField from './ColorInputField';

const BrandingColor = () => {
  const [mainColor, setMainColor] = useState('');
  const [lowColor, setLowColor] = useState('');
  const [highColor, setHighColor] = useState('');
  const [subGrayColor, setSubGrayColor] = useState('');

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
        />
        <ColorInputField
          label="키컬러 (저명도)"
          id="keyColorLow"
          colorValue={lowColor}
          onSetColorValue={(val: string) => setLowColor(val)}
        />
        <ColorInputField
          label="키컬러 (고명도)"
          id="keyColorHigh"
          colorValue={highColor}
          onSetColorValue={(val: string) => setHighColor(val)}
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

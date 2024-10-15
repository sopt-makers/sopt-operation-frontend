import { useState } from 'react';

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
              id="key-color-main"
              type="text"
              placeholder="ex. #ffffff"
              value={mainColor}
              onChange={(e) => setMainColor(e.target.value)}
            />
            <StColorPreview style={{ backgroundColor: mainColor }} />
          </StColorWrapper>
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="key-color-low">키컬러 (저명도)</StInputLabel>
          <StColorWrapper>
            <StInput
              id="key-color-low"
              type="text"
              placeholder="ex. #ffffff"
              value={lowColor}
              onChange={(e) => setLowColor(e.target.value)}
            />
            <StColorPreview style={{ backgroundColor: lowColor }} />
          </StColorWrapper>
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="key-color-high">키컬러 (고명도)</StInputLabel>
          <StColorWrapper>
            <StInput
              id="key-color-high"
              type="text"
              placeholder="ex. #ffffff"
              value={highColor}
              onChange={(e) => setHighColor(e.target.value)}
            />
            <StColorPreview style={{ backgroundColor: highColor }} />
          </StColorWrapper>
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="sub-color">
            서브 컬러 (강조 그레이 컬러)
          </StInputLabel>
          <StDescription>
            강조하고 싶은 박스의 그레이 컬러를 지정해주세요.
          </StDescription>
          <StColorWrapper>
            <StInput
              id="sub-color"
              type="text"
              placeholder="ex. #ffffff"
              value={subGrayColor}
              onChange={(e) => setSubGrayColor(e.target.value)}
            />
            <StColorPreview style={{ backgroundColor: subGrayColor }} />
          </StColorWrapper>
        </StInputBox>
      </StInputWrapper>
    </StWrapper>
  );
};

export default BrandingColor;

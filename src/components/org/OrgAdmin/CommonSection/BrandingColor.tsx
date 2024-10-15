import Image from 'next/image';
import { useState } from 'react';

import ImgSubColorInfo from '../assets/imgSubColorInfo.png';
import {
  StColorPreview,
  StColorWrapper,
  StDescription,
  StInfoButton,
  StInfoCloseButton,
  StInfoDescription,
  StInfoSubDescription,
  StInfoTitle,
  StInfoWrapper,
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
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleInfoToggle = () => {
    setIsInfoVisible((prev) => !prev);
  };

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
          <StInputLabel as={'p'}>
            <label htmlFor="sub-color">서브 컬러 (강조 그레이 컬러)</label>
            <StInfoButton onClick={handleInfoToggle}>
              &nbsp;&#9432;
            </StInfoButton>
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
              <Image
                src={ImgSubColorInfo}
                alt="서브 컬러가 적용되는 예시 이미지"
                width={434}
                height={293}
              />
            </StInfoWrapper>
          </StColorWrapper>
        </StInputBox>
      </StInputWrapper>
    </StWrapper>
  );
};

export default BrandingColor;

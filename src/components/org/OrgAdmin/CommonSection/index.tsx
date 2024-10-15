import { useState } from 'react';

import {
  StColorPreview,
  StColorWrapper,
  StContainer,
  StDateWrapper,
  StDescription,
  StInput,
  StInputBox,
  StInputLabel,
  StInputWrapper,
  StRadioBox,
  StRadioLabel,
  StRadioWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from './style';

const CommonSection = () => {
  const [mainColor, setMainColor] = useState('');
  const [lowColor, setLowColor] = useState('');
  const [highColor, setHighColor] = useState('');
  const [subGrayColor, setSubGrayColor] = useState('');

  return (
    <StContainer>
      <StWrapper>
        <StTitleWrapper>
          <StTitle>기수 정보</StTitle>
          <StDescription>
            공홈 내 기수, 기수명은 하단 정보로 일괄 반영돼요.
          </StDescription>
        </StTitleWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel>기수</StInputLabel>
            <StInput type="text" placeholder="ex. 35" />
          </StInputBox>
          <StInputBox>
            <StInputLabel>기수명</StInputLabel>
            <StInput type="text" placeholder="ex. 00 SOPT" />
          </StInputBox>
        </StInputWrapper>
      </StWrapper>
      <StWrapper>
        <StTitleWrapper>
          <StTitle>모집 일정</StTitle>
        </StTitleWrapper>
        <StInputWrapper>
          <StInputLabel>모집유형</StInputLabel>
          <StRadioWrapper>
            <StRadioBox>
              <StInput type="radio" name="group" id="ob" />
              <StRadioLabel>OB</StRadioLabel>
            </StRadioBox>
            <StRadioBox>
              <StInput type="radio" name="group" id="yb" />
              <StRadioLabel>YB</StRadioLabel>
            </StRadioBox>
          </StRadioWrapper>
        </StInputWrapper>
        <StDateWrapper>
          <StInputWrapper>
            <StInputBox>
              <StInputLabel>서류 접수 시작</StInputLabel>
              <StInput
                type="datetime-local"
                value={'2022-10-12T12:00'}
                hasValue={true}
              />
            </StInputBox>
            <StInputBox>
              <StInputLabel>서류 접수 마감</StInputLabel>
              <StInput type="datetime-local" hasValue={false} />
            </StInputBox>
            <StInputBox>
              <StInputLabel>서류 결과 발표</StInputLabel>
              <StInput type="datetime-local" hasValue={false} />
            </StInputBox>
          </StInputWrapper>
        </StDateWrapper>
        <StDateWrapper>
          <StInputWrapper>
            <StInputBox>
              <StInputLabel>면접 시작</StInputLabel>
              <StInput type="datetime-local" hasValue={false} />
            </StInputBox>
            <StInputBox>
              <StInputLabel>면접 마감</StInputLabel>
              <StInput type="datetime-local" hasValue={false} />
            </StInputBox>
          </StInputWrapper>
        </StDateWrapper>
        <StDateWrapper>
          <StInputWrapper>
            <StInputBox>
              <StInputLabel>최종 결과 발표</StInputLabel>
              <StInput type="datetime-local" hasValue={false} />
            </StInputBox>
          </StInputWrapper>
        </StDateWrapper>
      </StWrapper>
      <StWrapper>
        <StTitleWrapper>
          <StTitle>브랜딩 컬러</StTitle>
          <StDescription>다크 모드를 고려하여 선정해주세요.</StDescription>
        </StTitleWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel>키컬러 (메인)</StInputLabel>
            <StColorWrapper>
              <StInput
                type="text"
                placeholder="ex. #ffffff"
                value={mainColor}
                onChange={(e) => setMainColor(e.target.value)}
              />
              <StColorPreview style={{ backgroundColor: mainColor }} />
            </StColorWrapper>
          </StInputBox>
          <StInputBox>
            <StInputLabel>키컬러 (저명도)</StInputLabel>
            <StColorWrapper>
              <StInput
                type="text"
                placeholder="ex. #ffffff"
                value={lowColor}
                onChange={(e) => setLowColor(e.target.value)}
              />
              <StColorPreview style={{ backgroundColor: lowColor }} />
            </StColorWrapper>
          </StInputBox>
          <StInputBox>
            <StInputLabel>키컬러 (고명도)</StInputLabel>
            <StColorWrapper>
              <StInput
                type="text"
                placeholder="ex. #ffffff"
                value={highColor}
                onChange={(e) => setHighColor(e.target.value)}
              />
              <StColorPreview style={{ backgroundColor: highColor }} />
            </StColorWrapper>
          </StInputBox>
          <StInputBox>
            <StInputLabel>서브 컬러 (강조 그레이 컬러)</StInputLabel>
            <StDescription></StDescription>
            <StColorWrapper>
              <StInput
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
    </StContainer>
  );
};

export default CommonSection;

import {
  StDescription,
  StInput,
  StInputBox,
  StInputLabel,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from './style';

const GenerationInformation = () => {
  return (
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
  );
};

export default GenerationInformation;

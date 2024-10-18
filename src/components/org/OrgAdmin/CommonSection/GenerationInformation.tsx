import {
  StDescription,
  StInput,
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
        <StInput
          value={35}
          labelText="기수"
          id="generation"
          type="text"
          placeholder="ex. 35"
        />
        <StInput
          value={'AND SOPT'}
          labelText="기수명"
          id="sopt-name"
          type="text"
          placeholder="ex. 00 SOPT"
        />
      </StInputWrapper>
    </StWrapper>
  );
};

export default GenerationInformation;

import { useFormContext } from 'react-hook-form';

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
  const { register } = useFormContext();

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
          <StInputLabel htmlFor="generation">기수</StInputLabel>
          <StInput
            {...register('generation', {
              required: true,
            })}
            id="generation"
            type="text"
            placeholder="ex. 35"
          />
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="sopt-name">기수명</StInputLabel>
          <StInput
            {...register('soptName', {
              required: true,
            })}
            id="sopt-name"
            type="text"
            placeholder="ex. 00 SOPT"
          />
        </StInputBox>
      </StInputWrapper>
    </StWrapper>
  );
};

export default GenerationInformation;

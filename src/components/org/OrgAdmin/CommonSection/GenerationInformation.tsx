import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import {
  StDescription,
  StErrorMessage,
  StInput,
  StInputBox,
  StInputLabel,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from './style';

const GenerationInformation = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
              required: true && VALIDATION_CHECK.required.errorText,
              pattern: {
                value: VALIDATION_CHECK.generation.pattern,
                message: VALIDATION_CHECK.generation.errorText,
              },
              maxLength: {
                value: VALIDATION_CHECK.generation.maxLength,
                message: VALIDATION_CHECK.generation.wrongLengthErrorText,
              },
              minLength: {
                value: VALIDATION_CHECK.generation.minLength,
                message: VALIDATION_CHECK.generation.wrongLengthErrorText,
              },
            })}
            id="generation"
            type="text"
            placeholder="ex. 35"
          />
          <StErrorMessage>
            <>{errors.generation?.message}</>
          </StErrorMessage>
        </StInputBox>
        <StInputBox>
          <StInputLabel htmlFor="sopt-name">기수명</StInputLabel>
          <StInput
            {...register('soptName', {
              required: true && VALIDATION_CHECK.required.errorText,
              maxLength: {
                value: VALIDATION_CHECK.soptName.maxLength,
                message: VALIDATION_CHECK.soptName.wrongLengthErrorText(),
              },
            })}
            id="sopt-name"
            type="text"
            placeholder="ex. 00 SOPT"
          />
          <StErrorMessage>
            <>{errors.soptName?.message}</>
          </StErrorMessage>
        </StInputBox>
      </StInputWrapper>
    </StWrapper>
  );
};

export default GenerationInformation;

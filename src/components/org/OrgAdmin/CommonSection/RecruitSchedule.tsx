import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import {
  StDateWrapper,
  StErrorMessage,
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

const RecruitSchedule = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>모집 일정</StTitle>
      </StTitleWrapper>
      <StInputWrapper>
        <StInputLabel>모집유형</StInputLabel>
        <StRadioWrapper>
          <StRadioBox>
            <StInput
              {...register('group', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              type="radio"
              name="group"
              id="ob"
            />
            <StRadioLabel htmlFor="ob">OB</StRadioLabel>
          </StRadioBox>
          <StRadioBox>
            <StInput
              {...register('group', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              type="radio"
              name="group"
              id="yb"
            />
            <StRadioLabel htmlFor="yb">YB</StRadioLabel>
          </StRadioBox>
          <StErrorMessage>
            <>{errors.group?.message}</>
          </StErrorMessage>
        </StRadioWrapper>
      </StInputWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="application-start">
              서류 접수 시작
            </StInputLabel>
            <StInput
              {...register('applicationStart', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="application-start"
              type="datetime-local"
              value={'2022-10-12T12:00'}
              hasValue={true}
            />
            <StErrorMessage>
              <>{errors.applicationStart?.message}</>
            </StErrorMessage>
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-end">
              서류 접수 마감
            </StInputLabel>
            <StInput
              {...register('applicationEnd', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="application-end"
              type="datetime-local"
              hasValue={false}
            />
            <StErrorMessage>
              <>{errors.applicationEnd?.message}</>
            </StErrorMessage>
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-result">
              서류 결과 발표
            </StInputLabel>
            <StInput
              {...register('applicationResult', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="application-result"
              type="datetime-local"
              hasValue={false}
            />
            <StErrorMessage>
              <>{errors.applicationResult?.message}</>
            </StErrorMessage>
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="interview-start">면접 시작</StInputLabel>
            <StInput
              {...register('interviewStart', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="interview-start"
              type="datetime-local"
              hasValue={false}
            />
            <StErrorMessage>
              <>{errors.interviewStart?.message}</>
            </StErrorMessage>
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="interview-end">면접 마감</StInputLabel>
            <StInput
              {...register('interviewEnd', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="interview-end"
              type="datetime-local"
              hasValue={false}
            />
            <StErrorMessage>
              <>{errors.interviewEnd?.message}</>
            </StErrorMessage>
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="final-result">최종 결과 발표</StInputLabel>
            <StInput
              {...register('finalResult', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="final-result"
              type="datetime-local"
              hasValue={false}
            />
            <StErrorMessage>
              <>{errors.finalResult?.message}</>
            </StErrorMessage>
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;

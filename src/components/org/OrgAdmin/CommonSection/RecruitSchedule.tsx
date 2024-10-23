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
            <input
              {...register('group', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              type="radio"
              name="group"
              id="ob"
              checked
            />
            <StRadioLabel htmlFor="ob">OB</StRadioLabel>
          </StRadioBox>
          <StRadioBox>
            <input
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
              isError={errors.applicationStart?.message != undefined}
              errorMessage={errors.applicationStart?.message as string}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-end">
              서류 접수 마감
            </StInputLabel>
            <StInput
              {...register('applicationEnd', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              value={'2022-10-12T12:00'}
              id="application-end"
              type="datetime-local"
              hasValue={false}
              isError={errors.applicationEnd?.message != undefined}
              errorMessage={errors.applicationEnd?.message as string}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-result">
              서류 결과 발표
            </StInputLabel>
            <StInput
              {...register('applicationResult', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              value={'2022-10-12T12:00'}
              id="application-result"
              type="datetime-local"
              hasValue={false}
              isError={errors.applicationResult?.message != undefined}
              errorMessage={errors.applicationResult?.message as string}
            />
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
              value={'2022-10-12T12:00'}
              id="interview-start"
              type="datetime-local"
              hasValue={false}
              isError={errors.interviewStart?.message != undefined}
              errorMessage={errors.interviewStart?.message as string}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="interview-end">면접 마감</StInputLabel>
            <StInput
              {...register('interviewEnd', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              value={'2022-10-12T12:00'}
              id="interview-end"
              type="datetime-local"
              hasValue={false}
              isError={errors.interviewEnd?.message != undefined}
              errorMessage={errors.interviewEnd?.message as string}
            />
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
              value={'2022-10-12T12:00'}
              id="final-result"
              type="datetime-local"
              hasValue={false}
              isError={errors.finalResult?.message != undefined}
              errorMessage={errors.finalResult?.message as string}
            />
          </StInputBox>
        </StInputWrapper>
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;

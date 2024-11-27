import { Chip } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import {
  StDescription,
  StInput,
  StInputBox,
  StInputLabel,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import { StDateWrapper, StRadioWrapper } from './style';

const RecruitSchedule = () => {
  const [group, setGroup] = useState<'OB' | 'YB'>('OB');

  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>모집 일정</StTitle>
        <StDescription>
          입력된 모집 일정에 맞춰 ‘지원하기’ 버튼이 활성화돼요.
        </StDescription>
      </StTitleWrapper>
      <StRadioWrapper>
        <Chip active={group === 'OB'} onClick={() => setGroup('OB')}>
          OB
        </Chip>
        <Chip active={group === 'YB'} onClick={() => setGroup('YB')}>
          YB
        </Chip>
      </StRadioWrapper>
      <StDateWrapper>
        <StInputWrapper>
          <StInputBox>
            <StInputLabel htmlFor="application-start">
              {group} 서류 접수 시작
            </StInputLabel>
            <StInput
              {...register('applicationStart', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              id="application-start"
              type="datetime-local"
              value={''}
              // value={'2022-10-12T12:00'}
              hasValue={false}
              isError={errors.applicationStart?.message != undefined}
              errorMessage={errors.applicationStart?.message as string}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-end">
              {group} 서류 접수 마감
            </StInputLabel>
            <StInput
              {...register('applicationEnd', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              value={'2022-10-12T12:00'}
              id="application-end"
              type="datetime-local"
              hasValue={true}
              isError={errors.applicationEnd?.message != undefined}
              errorMessage={errors.applicationEnd?.message as string}
            />
          </StInputBox>
          <StInputBox>
            <StInputLabel htmlFor="application-result">
              {group} 서류 결과 발표
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
            <StInputLabel htmlFor="interview-start">
              {group} 면접 시작
            </StInputLabel>
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
            <StInputLabel htmlFor="interview-end">
              {group} 면접 마감
            </StInputLabel>
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
            <StInputLabel htmlFor="final-result">
              {group} 최종 결과 발표
            </StInputLabel>
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

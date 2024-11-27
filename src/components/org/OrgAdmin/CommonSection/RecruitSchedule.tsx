import { Chip } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  StDescription,
  StInput,
  StInputBox,
  StInputLabel,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import { StDateWrapper, StRadioWrapper } from './style';

interface ScheduleInputProps {
  id: string;
  label: string;
  value: string;
}

const ScheduleInput = ({ id, label, value }: ScheduleInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StInputBox>
      <StInputLabel htmlFor={id}>{label}</StInputLabel>
      <StInput
        {...register(id)}
        id={id}
        type="datetime-local"
        value={value}
        hasValue={!!value}
        isError={!!errors[id]?.message}
        errorMessage={errors[id]?.message as string}
      />
    </StInputBox>
  );
};

const RecruitSchedule = () => {
  const [group, setGroup] = useState<'OB' | 'YB'>('OB');

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
        <ScheduleInput
          id="application-start"
          label={`${group} 서류 접수 시작`}
          value={''}
        />
        <ScheduleInput
          id="application-end"
          label={`${group} 서류 접수 마감`}
          value={''}
        />
        <ScheduleInput
          id="application-result"
          label={`${group} 서류 결과 발표`}
          value={''}
        />
      </StDateWrapper>
      <StDateWrapper>
        <ScheduleInput
          id="interview-start"
          label={`${group} 면접 시작`}
          value={''}
        />
        <ScheduleInput
          id="interview-end"
          label={`${group} 면접 마감`}
          value={''}
        />
      </StDateWrapper>
      <StDateWrapper>
        <ScheduleInput
          id="final-result"
          label={`${group} 최종 결과 발표`}
          value={''}
        />
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;

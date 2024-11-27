import { Chip } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  StDescription,
  StInput,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import { StDateWrapper, StRadioWrapper } from './style';

interface ScheduleInputProps {
  id: string;
  label: string;
}

const ScheduleInput = ({ id, label }: ScheduleInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <StInput
      {...register(id)}
      required
      labelText={label}
      id={id}
      type="datetime-local"
      // hasValue={!!value}
      isError={!!errors[id]?.message}
      errorMessage={errors[id]?.message as string}
    />
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
          id={`recruitSchedule_${group}_schedule_applicationStartTime`}
          label={`${group} 서류 접수 시작`}
        />
        <ScheduleInput
          id={`recruitSchedule_${group}_schedule_applicationEndTime`}
          label={`${group} 서류 접수 마감`}
        />
        <ScheduleInput
          id={`recruitSchedule_${group}_schedule_applicationResultTime`}
          label={`${group} 서류 결과 발표`}
        />
      </StDateWrapper>
      <StDateWrapper>
        <ScheduleInput
          id={`recruitSchedule_${group}_schedule_interviewStartTime`}
          label={`${group} 면접 시작`}
        />
        <ScheduleInput
          id={`recruitSchedule_${group}_schedule_interviewEndTime`}
          label={`${group} 면접 마감`}
        />
      </StDateWrapper>
      <StDateWrapper>
        <ScheduleInput
          id={`recruitSchedule_${group}_schedule_finalResultTime`}
          label={`${group} 최종 결과 발표`}
        />
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;

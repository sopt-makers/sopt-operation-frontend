import { Chip } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import {
  StDescription,
  StInput,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import { Group } from '../types';
import { StDateWrapper, StRadioWrapper } from './style';

interface ScheduleInputProps {
  id: string;
  label: string;
}

const ScheduleInput = ({ id, label }: ScheduleInputProps) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <StInput
      {...register(id, {
        required: true && VALIDATION_CHECK.required.errorText,
      })}
      required
      labelText={label}
      id={id}
      type="datetime-local"
      hasValue={!!watch(id)}
      isError={!!errors[id]?.message}
      errorMessage={errors[id]?.message as string}
    />
  );
};

interface RecruitScheduleProps {
  group: Group;
  onChangeGroup: (group: Group) => void;
}

const RecruitSchedule = ({ group, onChangeGroup }: RecruitScheduleProps) => {
  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>모집 일정</StTitle>
        <StDescription>
          입력된 모집 일정에 맞춰 ‘지원하기’ 버튼이 활성화돼요.
        </StDescription>
      </StTitleWrapper>
      <StRadioWrapper>
        <Chip active={group === 'OB'} onClick={() => onChangeGroup('OB')}>
          OB
        </Chip>
        <Chip active={group === 'YB'} onClick={() => onChangeGroup('YB')}>
          YB
        </Chip>
      </StRadioWrapper>
      <div key={group}>
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
      </div>
    </StWrapper>
  );
};

export default RecruitSchedule;

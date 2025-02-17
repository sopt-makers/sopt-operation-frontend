import { Chip } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import { SCHEDULE_FIELDS, VALIDATION_CHECK } from '@/utils/org';

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
  const [recruitSchedule, group, time] = id.split('.');

  return (
    <StInput
      {...register(id, {
        required: true && VALIDATION_CHECK.required.errorText,
      })}
      required
      labelText={label}
      id={id}
      type="datetime-local"
      hasValue={!!watch(`${recruitSchedule}.${group}.${time}`)}
      isError={!!(errors as any)[recruitSchedule]?.[group]?.[time]?.message}
      errorMessage={
        (errors as any)[recruitSchedule]?.[group]?.[time]?.message as string
      }
    />
  );
};

interface RecruitScheduleProps {
  group: Group;
  onChangeGroup: (group: Group) => void;
}

const RecruitSchedule = ({ group, onChangeGroup }: RecruitScheduleProps) => {
  const currentFields = SCHEDULE_FIELDS[group];

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

      <StDateWrapper>
        {currentFields.application.map(({ id, label }) => (
          <ScheduleInput key={id} id={id} label={label} />
        ))}
      </StDateWrapper>

      <StDateWrapper>
        {currentFields.interview.map(({ id, label }) => (
          <ScheduleInput key={id} id={id} label={label} />
        ))}
      </StDateWrapper>

      <StDateWrapper>
        {currentFields.final.map(({ id, label }) => (
          <ScheduleInput key={id} id={id} label={label} />
        ))}
      </StDateWrapper>
    </StWrapper>
  );
};

export default RecruitSchedule;

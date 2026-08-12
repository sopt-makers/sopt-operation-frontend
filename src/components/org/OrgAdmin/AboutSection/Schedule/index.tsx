import { IconInfoCircle } from '@sopt-makers/icons';
import { Button, DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useFormContext, useWatch } from 'react-hook-form';

import Modal from '@/components/org/OrgAdmin/common/Modal';

import RequiredIcon from '../../assets/RequiredIcon';
import useModal from '../../common/Modal/useModal';
import { StWrapper } from '../style';
import {
  StScheduleBody,
  StScheduleDateField,
  StScheduleFieldLabel,
  StScheduleHeader,
  StScheduleIndex,
  StScheduleInfoButton,
  StScheduleModalWrapper,
  StScheduleRow,
  StScheduleRowWrapper,
  StScheduleSessionField,
  StScheduleTitle,
  StScheduleWrapper,
} from './style';

export const SCHEDULE_ROW_COUNT = 16;
const SCHEDULE_ROW_INDICES = Array.from(
  { length: SCHEDULE_ROW_COUNT },
  (_, index) => index,
);

interface ScheduleProps {
  isEditable?: boolean;
}

const Schedule = ({ isEditable = true }: ScheduleProps) => {
  const { isInfoVisible, onInfoToggle } = useModal();
  const { open } = useDialog();
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext();

  const activitySchedule = useWatch({ control, name: 'activitySchedule' });
  const hasAnyDate = SCHEDULE_ROW_INDICES.some(
    (index) => activitySchedule?.[index]?.date,
  );

  const handleResetDates = () => {
    SCHEDULE_ROW_INDICES.forEach((index) => {
      setValue(`activitySchedule.${index}.date`, '', {
        shouldDirty: true,
        shouldValidate: false,
      });
    });
  };

  const dialogOption: DialogOptionType = {
    title: '전체 일정 날짜를 초기화하시겠습니까?',
    description: '입력한 모든 날짜가 초기화됩니다.',
    type: 'danger',
    typeOptions: {
      cancelButtonText: '취소',
      approveButtonText: '초기화',
      buttonFunction: () => handleResetDates(),
    },
  };

  const handleOpenDateResetConfirmation = () => {
    open(dialogOption);
  };

  const scheduleErrors = errors.activitySchedule as
    | { [index: number]: { date?: { message?: string } } }
    | undefined;
  const firstRowErrorMessage = scheduleErrors?.[0]?.date?.message as
    | string
    | undefined;

  return (
    <StWrapper>
      <StScheduleWrapper>
        <StScheduleHeader>
          <StScheduleTitle>
            <span>전체 일정</span>
            <StScheduleInfoButton onClick={onInfoToggle} type="button">
              <IconInfoCircle />
            </StScheduleInfoButton>
          </StScheduleTitle>
          <Button
            size="md"
            variant="fill"
            onClick={handleOpenDateResetConfirmation}
            disabled={!isEditable || !hasAnyDate}>
            날짜 초기화
          </Button>
        </StScheduleHeader>

        <StScheduleBody>
          <StScheduleFieldLabel>
            <span>전체 일정 및 진행 세션</span>
            <RequiredIcon />
          </StScheduleFieldLabel>
          <StScheduleRowWrapper>
            {SCHEDULE_ROW_INDICES.map((index) => (
              <StScheduleRow key={index}>
                <StScheduleIndex>
                  {String(index + 1).padStart(2, '0')}
                </StScheduleIndex>
                <StScheduleDateField
                  {...register(`activitySchedule.${index}.date`)}
                  id={`schedule-date-${index}`}
                  type="date"
                  placeholder="YYYY.MM.DD"
                  hasValue={Boolean(activitySchedule?.[index]?.date)}
                  disabled={!isEditable}
                  isError={index === 0 && Boolean(firstRowErrorMessage)}
                  errorMessage={index === 0 ? firstRowErrorMessage : undefined}
                />
                <StScheduleSessionField
                  {...register(`activitySchedule.${index}.session`)}
                  id={`schedule-session-${index}`}
                  placeholder="세션명을 입력해 주세요."
                  disabled={!isEditable}
                />
              </StScheduleRow>
            ))}
          </StScheduleRowWrapper>
        </StScheduleBody>

        <StScheduleModalWrapper>
          <Modal
            title="전체 일정"
            description="전체 일정 및 진행 세션을 순서대로 작성하는 영역이에요."
            subDescription="왼쪽부터 번호, 날짜, 세션명 순서로 정리해주세요."
            imgSrc="/images/org/imgSchedule.png"
            isInfoVisible={isInfoVisible}
            onInfoToggle={onInfoToggle}
          />
        </StScheduleModalWrapper>
      </StScheduleWrapper>
    </StWrapper>
  );
};

export default Schedule;

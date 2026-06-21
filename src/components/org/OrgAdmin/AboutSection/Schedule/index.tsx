import { IconInfoCircle } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { DialogOptionType, useDialog } from '@sopt-makers/ui';
import { useState } from 'react';

import RequiredIcon from '../../assets/RequiredIcon';
// import Modal from '../../common/Modal';
import useModal from '../../common/Modal/useModal';
import { StWrapper } from '../style';
import {
  StScheduleBody,
  StScheduleDateField,
  StScheduleFieldLabel,
  StScheduleHeader,
  StScheduleIndex,
  StScheduleInfoButton,
  // StScheduleModalWrapper,
  StScheduleRow,
  StScheduleRowWrapper,
  StScheduleSessionField,
  StScheduleTitle,
  StScheduleWrapper,
} from './style';

type ScheduleRow = {
  date: string;
  session: string;
};

const INITIAL_SCHEDULE_ROWS: ScheduleRow[] = Array.from({ length: 16 }, () => ({
  date: '',
  session: '',
}));

const Schedule = () => {
  const { isInfoVisible, onInfoToggle } = useModal();
  const { open } = useDialog();
  const [rows, setRows] = useState<ScheduleRow[]>(INITIAL_SCHEDULE_ROWS);

  const handleResetDates = () => {
    setRows((currentRows) => currentRows.map((row) => ({ ...row, date: '' })));
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
            disabled={rows.every((row) => row.date === '')}>
            날짜 초기화
          </Button>
        </StScheduleHeader>

        <StScheduleBody>
          <StScheduleFieldLabel>
            <span>전체 일정 및 진행 세션</span>
            <RequiredIcon />
          </StScheduleFieldLabel>
          <StScheduleRowWrapper>
            {rows.map((row, index) => (
              <StScheduleRow key={index}>
                <StScheduleIndex>
                  {String(index + 1).padStart(2, '0')}
                </StScheduleIndex>
                <StScheduleDateField
                  id={`schedule-date-${index}`}
                  type="date"
                  placeholder="YYYY.MM.DD"
                  value={row.date}
                  onChange={(event) => {
                    const nextDate = event.currentTarget.value;
                    setRows((currentRows) =>
                      currentRows.map((currentRow, currentIndex) =>
                        currentIndex === index
                          ? { ...currentRow, date: nextDate }
                          : currentRow,
                      ),
                    );
                  }}
                  required
                  hasValue={row.date.length > 0}
                />
                <StScheduleSessionField
                  id={`schedule-session-${index}`}
                  placeholder="세션명을 입력해 주세요."
                  value={row.session}
                  onChange={(event) => {
                    const nextSession = event.currentTarget.value;
                    setRows((currentRows) =>
                      currentRows.map((currentRow, currentIndex) =>
                        currentIndex === index
                          ? { ...currentRow, session: nextSession }
                          : currentRow,
                      ),
                    );
                  }}
                  required
                />
              </StScheduleRow>
            ))}
          </StScheduleRowWrapper>
        </StScheduleBody>
      </StScheduleWrapper>

      {/* <StScheduleModalWrapper>
        <Modal
          title="전체 일정"
          description="전체 일정 및 진행 세션을 순서대로 작성하는 영역이에요."
          subDescription="왼쪽부터 번호, 날짜, 세션명 순서로 정리해주세요."
          imgSrc="/images/org/imgAboutHeaderInfo.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StScheduleModalWrapper> */}
    </StWrapper>
  );
};

export default Schedule;

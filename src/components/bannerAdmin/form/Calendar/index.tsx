import 'react-calendar/dist/Calendar.css';

import { fontsObject } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Calendar from 'react-calendar';
import { useFormContext } from 'react-hook-form';

import CalendarIcon from '@/assets/icons/calendar_big.svg';

import ErrorMessage from '../ErrorMessage';

/**
 * CalendarInputForm
 * @param selectedDate 선택된 날짜
 * @param setSelectedDate 선택된 날짜 변경 함수
 * @param error 에러 메시지
 * @param dateType 캘린더 타입, startDate(시작일 캘린더), endDate(마감일 캘린더), singleSelect(단일선택 캘린더)
 */

interface Props {
  selectedDate: string[] | null;
  setSelectedDate: Dispatch<SetStateAction<string[] | string | null>>;
  selectedDateFieldName: string;
  error?: string;
  dateType?: 'startDate' | 'endDate' | 'singleSelect';
}
import 'dayjs/locale/ko';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const formatCalendarDate = (date?: string | Date) =>
  dayjs(date).format('YYYY.MM.DD');

const CalendarInputForm = ({
  selectedDate,
  setSelectedDate,
  error,
  dateType,
  selectedDateFieldName,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { getValues, setValue } = useFormContext();
  const [inputValue, setInputValue] = useState(
    dateType === 'endDate' ? selectedDate?.[1] : selectedDate?.[0],
  );
  const [startDate, endDate] = getValues(selectedDateFieldName) ?? ['', ''];

  const handleDateChange = (date: Date) => {
    const newDate = formatCalendarDate(date);
    let newSelectedDate: string[] = [startDate, endDate];

    if (dateType === 'singleSelect') {
      setSelectedDate([newDate, '']);
      setInputValue(newDate);
      return;
    }

    if (!startDate && !endDate) {
      // 첫 번째 날짜 선택
      newSelectedDate = [newDate, ''];
    } else if (startDate && !endDate) {
      // startDate 만 선택된 상태,  새로운 날짜 선택
      // 새로운 날짜가 startDate 보다 전이면 startDate 변경
      newSelectedDate =
        newDate < startDate ? [newDate, ''] : [startDate, newDate];
    } else if (!startDate && endDate) {
      // end 만 선택된 상태,  새로운 날짜 선택
      // 새로운 날짜가 end보다 이후면 end 변경
      newSelectedDate = newDate > endDate ? ['', newDate] : [newDate, endDate];
    } else if (startDate && endDate) {
      // start 와 end 모두 선택된 상태,  새로운 날짜 선택
      if (newDate < startDate) {
        // start보다 이전 날짜 클릭 → start 변경
        newSelectedDate = [newDate, endDate];
      } else if (newDate > endDate) {
        // end보다 이후 날짜 클릭 → end 변경
        newSelectedDate = [startDate, newDate];
      } else if (newDate > startDate && newDate < endDate) {
        // start와 end 사이의 날짜 선택
        newSelectedDate =
          dateType === 'startDate' ? [newDate, endDate] : [startDate, newDate];
      } else {
        newSelectedDate =
          dateType === 'startDate' ? [newDate, endDate] : [startDate, newDate];
      }
    }
    setSelectedDate(newSelectedDate);
    setInputValue(
      dateType === 'endDate' ? newSelectedDate[1] : newSelectedDate[0],
    );
  };

  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback((event: MouseEvent) => {
    if (
      !containerRef.current ||
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value.replace(/\D/g, '');
    let formattedValue = '';

    if (rawValue.length > 0) formattedValue += rawValue.substring(0, 4);
    if (rawValue.length > 4) formattedValue += '.' + rawValue.substring(4, 6);
    if (rawValue.length > 6) formattedValue += '.' + rawValue.substring(6, 8);

    setInputValue(formattedValue);

    if (rawValue.length === 8) {
      if (dateType === 'endDate') {
        setSelectedDate([startDate, formattedValue]);
        setValue(selectedDateFieldName, [startDate, formattedValue]);
      } else {
        setSelectedDate([formattedValue, endDate]);
        setValue(selectedDateFieldName, [formattedValue, endDate]);
      }
    }
  };

  useEffect(() => {
    if (selectedDate) {
      setInputValue(dateType === 'endDate' ? selectedDate[1] : selectedDate[0]);
    }
  }, [dateType, selectedDate]);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [containerRef, setIsOpen, handleOutsideClick]);

  const CalendarComponent = () => {
    return (
      <Calendar
        value={
          selectedDate
            ? [
                dayjs(selectedDate[0], 'YYYY.MM.DD').toDate(),
                dayjs(selectedDate[1], 'YYYY.MM.DD').toDate(),
              ]
            : null
        }
        selectRange={dateType !== 'singleSelect'}
        onClickDay={handleDateChange}
        formatDay={(locale, date) => dayjs(date).format('D')}
        formatShortWeekday={(locale, date) =>
          ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()] ?? ''
        }
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        minDetail="month"
        maxDetail="month"
        calendarType="gregory"
        tileContent={({ date, view }) => {
          if (selectedDate?.includes(formatCalendarDate(date))) {
            return (
              <SDotWrapper>
                <SDot></SDot>
              </SDotWrapper>
            );
          }
        }}
      />
    );
  };

  return (
    <>
      <SInputWrapper onClick={() => setIsOpen(true)}>
        <SInput
          type="text"
          name={selectedDateFieldName}
          value={inputValue}
          onChange={handleInputChange}
          maxLength={10}
          placeholder="YYYY.MM.DD"
        />

        <CalendarIcon />
      </SInputWrapper>
      {error && dateType !== 'endDate' && (
        <SErrorMessage>{error}</SErrorMessage>
      )}
      {isOpen && (
        <SCalendarWrapper ref={containerRef}>
          <CalendarComponent />
        </SCalendarWrapper>
      )}
    </>
  );
};

export default CalendarInputForm;

export const SCalendarWrapper = styled.div`
  background-color: ${colors.gray600};
  padding: 10px;
  width: 320px;
  border-radius: 16px;
  position: absolute;
  z-index: 9999;
  margin-top: -15px;
`;

export const SErrorMessage = styled(ErrorMessage)`
  margin-top: 12px;
`;

export const SDotWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
`;

export const SInputWrapper = styled.div`
  display: flex;
  width: 100%;
  padding: 13px 16px;
  color: ${colors.gray10};
  background: ${colors.gray700};
  border-radius: 10px;
  justify-content: space-between;
  cursor: pointer;
`;

export const SDot = styled.div`
  height: 5px;
  width: 5px;
  background-color: ${colors.gray400};
  border-radius: 50%;
  position: absolute;
  top: 22px;
  display: flex;
`;

export const SInput = styled.input`
  width: 80%;
  display: flex;
  align-items: center;
  cursor: pointer;
  ${fontsObject.BODY_2_16_M};
  color: ${colors.gray10};
  caret-color: transparent;
  border: none;

  &::placeholder {
    color: ${colors.gray500};

    @media (max-width: 768px) {
      ${fontsObject.LABEL_5_11_SB};
    }
  }
`;

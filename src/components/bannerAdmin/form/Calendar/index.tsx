import 'react-calendar/dist/Calendar.css';

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import dayjs from 'dayjs';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import Calendar from 'react-calendar';

import CalendarIcon from '@/assets/icons/calendar_big.svg';

import ErrorMessage from '../ErrorMessage';

interface Props {
  selectedDate: string | null;
  setSelectedDate: Dispatch<SetStateAction<string | null>>;
  error?: string;
}

const CalendarInputForm = ({ selectedDate, setSelectedDate, error }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const CalendarComponent = () => {
    return (
      <>
        <Calendar
          value={
            selectedDate ? dayjs(selectedDate, 'YYYY-MM-DD').toDate() : null
          }
          onClickDay={(date) =>
            setSelectedDate(dayjs(date).format('YYYY.MM.DD'))
          }
          formatDay={(locale, date) => dayjs(date).format('D')}
          formatShortWeekday={(locale, date) =>
            ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()] ??
            ''
          }
          showNeighboringMonth={false}
          next2Label={null}
          prev2Label={null}
          minDetail="month"
          maxDetail="month"
          calendarType="gregory"
          tileContent={({ date, view }) => {
            if (selectedDate == dayjs(date).format('YYYY.MM.DD')) {
              return (
                <SDotWrapper>
                  <SDot></SDot>
                </SDotWrapper>
              );
            }
          }}
        />
        {error && <SErrorMessage>{error}</SErrorMessage>}
      </>
    );
  };
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = useCallback((event: any) => {
    if (!containerRef.current || !containerRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [containerRef, setIsOpen, handleOutsideClick]);

  return (
    <>
      <SInputWrapper onClick={() => setIsOpen(true)}>
        <SInput
          value={
            selectedDate as string | number | readonly string[] | undefined
          }
          placeholder="YYYY.MM.DD"
        />
        <CalendarIcon />
      </SInputWrapper>
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
  margin-top: 10px;
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

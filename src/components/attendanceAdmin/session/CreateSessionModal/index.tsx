import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useRecoilValue } from 'recoil';

import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import IcDropdown from '@/components/common/icons/IcDropDown';
import Input from '@/components/common/Input';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';
import { useCreateSession } from '@/hooks/useCreateSession';
import { currentGenerationState } from '@/recoil/atom';
import {
  attributeList,
  partList,
  partTranslator,
  sessionTranslator,
  times,
} from '@/utils/session';

import { StDatePickerInput, StSessionModalWrapper } from './style';

interface Props {
  onClose: () => void;
}

function CreateSessionModal(props: Props) {
  const { onClose } = props;

  // 세션 생성에 필요한 State
  const [part, setPart] = useState<string>('파트 선택');
  const [sessionName, setSessionName] = useState<string>();
  const [sessionLocation, setSessionLocation] = useState<string>();
  const [date, setDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>('14:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [attribute, setAttribute] = useState<string>('세션 선택');

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPartOpen, setIsPartOpen] = useState<boolean>(false);
  const [isAttributeOpen, setIsAttributeOpen] = useState<boolean>(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState<boolean>(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState<boolean>(false);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  const currentGeneration = useRecoilValue(currentGenerationState);

  const { createSession } = useCreateSession(part);

  useEffect(() => {
    if (
      part !== '파트선택' &&
      sessionName &&
      sessionLocation &&
      date &&
      startTime &&
      endTime &&
      attribute !== '세션 선택'
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [part, sessionName, sessionLocation, date, startTime, endTime, attribute]);

  /** 각각의 State 에 담아준 상태들을 객체화 시켜 post 하는 함수 */
  const handleSubmit = async () => {
    if (!buttonClicked) {
      setButtonClicked(true);

      const translatedPart = partTranslator[part];
      const translatedAttribute = sessionTranslator[attribute];

      const submitContents = {
        part: translatedPart,
        name: sessionName,
        place: sessionLocation,
        startDate: `${date}T${startTime}`,
        endDate: `${date}T${endTime}`,
        attribute: translatedAttribute,
        generation: parseInt(currentGeneration),
      };

      createSession(submitContents);
      onClose();
    }
  };

  /** 파트 선택 핸들러 */
  const handleSelectedPart = (selectedPart: string) => {
    setPart(selectedPart);
    setIsPartOpen(false);
  };

  const handleSelectedAttribute = (selectedAttribute: string): void => {
    setAttribute(selectedAttribute);
    setIsAttributeOpen(false);
  };

  /** 시간 선택 핸들러 */
  const handleSelectedTime = (time: string, timeType: string) => {
    if (timeType === 'startTime') {
      setStartTime(time);
      setIsStartTimeOpen(false);
    } else if (timeType === 'endTime') {
      setEndTime(time);
      setIsEndTimeOpen(false);
    }
  };

  /** 세션 이름 or 세션 장소 핸들러*/
  const handleSessionInfo = (
    e: React.ChangeEvent<HTMLInputElement>,
    inputType: string,
  ) => {
    const value = e.target.value;

    if (inputType === '세션 이름') {
      setSessionName(value);
    } else if (inputType === '세션 장소') {
      setSessionLocation(value);
    }
  };

  /** 받아온 날짜 데이터를 변환하는 함수 */
  const handleSessionDate = (date: Date | null) => {
    const originalDate = date;
    const isoDate = dayjs(originalDate).format('YYYY-MM-DD');
    setSelectedDate(date);

    if (date) {
      setDate(isoDate);
    }
  };

  return (
    <StSessionModalWrapper>
      <ModalHeader
        title="세션 생성"
        desc="대상 파트를 선택해주세요."
        onClose={onClose}
      />
      <main>
        <div className="dropdowns">
          <OptionTemplate title="세션 종류">
            <Selector
              content={attribute}
              onClick={() => setIsAttributeOpen(!isAttributeOpen)}
              isDisabledValue={attribute === '세션 선택'}
            />
            {isAttributeOpen && (
              <DropDown
                list={attributeList}
                onItemSelected={handleSelectedAttribute}
                type={'select'}
              />
            )}
          </OptionTemplate>
          <OptionTemplate title="파트">
            <Selector
              content={part}
              onClick={() => setIsPartOpen(!isPartOpen)}
              isDisabledValue={part === '파트 선택'}
            />
            {isPartOpen && (
              <DropDown
                list={partList}
                onItemSelected={handleSelectedPart}
                type={'select'}
              />
            )}
          </OptionTemplate>
        </div>
        <div className="inputs">
          <OptionTemplate title="세션명">
            <Input
              type="text"
              placeholder="세션명을 입력하세요."
              onChange={(e) => handleSessionInfo(e, '세션 이름')}
            />
          </OptionTemplate>
          <OptionTemplate title="세션 장소">
            <Input
              type="text"
              placeholder="세션이 열리는 장소를 입력하세요."
              onChange={(e) => handleSessionInfo(e, '세션 장소')}
            />
          </OptionTemplate>
          <OptionTemplate title="세션 날짜">
            <StDatePickerInput>
              <DatePicker
                placeholderText="세션 날짜를 선택해주세요"
                dateFormat="yyyy.MM.dd"
                selected={selectedDate}
                onChange={handleSessionDate}>
                <IcDropdown color={date ? '#3C3D40' : '#C0C5C9'} />
              </DatePicker>
            </StDatePickerInput>
          </OptionTemplate>
          <div className="time">
            <OptionTemplate title="시작 시각">
              <Selector
                content={startTime}
                onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
              />
              {isStartTimeOpen && (
                <DropDown
                  list={times}
                  type={'times'}
                  onItemSelected={(time: string) =>
                    handleSelectedTime(time, 'startTime')
                  }
                />
              )}
            </OptionTemplate>
            <OptionTemplate title="종료 시각">
              <Selector
                content={endTime}
                onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
              />
              {isEndTimeOpen && (
                <DropDown
                  list={times}
                  type={'times'}
                  onItemSelected={(time: string) =>
                    handleSelectedTime(time, 'endTime')
                  }
                />
              )}
            </OptionTemplate>
          </div>
        </div>
      </main>
      <ModalFooter>
        <Button type={'button'} text="취소하기" onClick={onClose} />
        <Button
          type={'submit'}
          text="알림 생성하기"
          disabled={buttonDisabled}
          onClick={() => handleSubmit()}
        />
      </ModalFooter>
    </StSessionModalWrapper>
  );
}

export default CreateSessionModal;

import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';

import { IcCheckBox, IcModalClose } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import IcDropdown from '@/components/common/icons/IcDropDown';
import { partList, sessionType, times } from '@/utils/session';

import {
  StFooter,
  StFormLayout,
  StFormSection,
  StHeader,
  StMain,
  StPartSelector,
  StSelectedPart,
  StSessionSelector,
  StTitle,
  StWrapper,
} from './style';

type Props = {
  onClose: () => void;
};

function CreateSessionModal({ onClose }: Props) {
  const [part, setPart] = useState<string>('파트선택');
  const [sessionName, setSessionName] = useState<string>();
  const [sessionLocation, setSessionLocation] = useState<string>();
  const [date, setDate] = useState<string>();
  const [startTime, setStartTime] = useState<string>('14:00');
  const [endTime, setEndTime] = useState<string>('18:00');
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number>(-1);

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPartOpen, setIsPartOpen] = useState<boolean>(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState<boolean>(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState<boolean>(false);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  useEffect(() => {
    if (
      part !== '파트선택' &&
      sessionName &&
      sessionLocation &&
      date &&
      startTime &&
      endTime &&
      selectedSessionIndex !== -1
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [
    part,
    sessionName,
    sessionLocation,
    date,
    startTime,
    endTime,
    selectedSessionIndex,
  ]);

  const handleSubmit = () => {
    const submitContents = {
      part: part,
      name: sessionName,
      place: sessionLocation,
      startTime: `${date} ${startTime}`,
      endTime: `${date} ${endTime}`,
      attribute: sessionType[selectedSessionIndex].session,
    };

    console.log(submitContents);
  };

  const handlePartSelection = (selectedPart: string) => {
    setPart(selectedPart);
    setIsPartOpen(false);
  };

  const handleInputChange = (
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

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);

    if (date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);

      const formattedDate = `${year}/${month}/${day}`;
      setDate(formattedDate);
    }
  };

  const handleTimeSelection = (time: string, timeType: string) => {
    if (timeType === 'startTime') {
      setStartTime(time);
      setIsStartTimeOpen(false);
    } else if (timeType === 'endTime') {
      setEndTime(time);
      setIsEndTimeOpen(false);
    }
  };

  return (
    <>
      <StWrapper>
        <StHeader>
          <StTitle>
            <h1>세션 생성</h1>
            <IcModalClose onClick={onClose} />
          </StTitle>
          <h2>새로운 SOPT 세션을 생성합니다. 대상 파트를 선택해주세요.</h2>
        </StHeader>
        <StMain>
          <StPartSelector onClick={() => setIsPartOpen(!isPartOpen)}>
            <StSelectedPart
              textColor={part === '파트선택' ? '#606265' : '#8040FF'}>
              {part}
            </StSelectedPart>
            <IcDropdown color={part === '파트선택' ? '#606265' : '#8040FF'} />
          </StPartSelector>
          {isPartOpen && (
            <DropDown
              list={partList}
              onItemSelected={handlePartSelection}
              type={'select'}
            />
          )}
          <StFormSection>
            <article>
              <div className="form_container">
                <p>세션명</p>
                <StFormLayout>
                  <input
                    placeholder="세션 이름을 입력해주세요"
                    onChange={(e) => handleInputChange(e, '세션 이름')}></input>
                </StFormLayout>
              </div>
              <div className="form_container">
                <p>세션 장소</p>
                <StFormLayout>
                  <input
                    placeholder="세션이 열리는 장소를 입력해주세요"
                    onChange={(e) => handleInputChange(e, '세션 장소')}></input>
                </StFormLayout>
              </div>
            </article>
            <article>
              <div className="form_container">
                <p>세션 날짜</p>
                <StFormLayout>
                  <DatePicker
                    placeholderText="세션 날짜를 선택해주세요"
                    dateFormat="yyyy/MM/dd"
                    selected={selectedDate}
                    onChange={handleDateChange}
                  />
                  <IcDropdown color="#3C3D40" />
                </StFormLayout>
              </div>
              <div className="input_time">
                <div className="form_container">
                  <p>시작 시각</p>
                  <StFormLayout
                    onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}>
                    <span>{startTime}</span>
                    <IcDropdown color="#3C3D40" />
                  </StFormLayout>
                  {isStartTimeOpen && (
                    <DropDown
                      list={times}
                      type={'times'}
                      onItemSelected={(time: string) =>
                        handleTimeSelection(time, 'startTime')
                      }
                    />
                  )}
                </div>
                <div className="form_container">
                  <p>종료 시각</p>
                  <StFormLayout
                    onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}>
                    <span>{endTime}</span>
                    <IcDropdown color="#3C3D40" />
                  </StFormLayout>
                  {isEndTimeOpen && (
                    <DropDown
                      list={times}
                      type={'times'}
                      onItemSelected={(time: string) =>
                        handleTimeSelection(time, 'endTime')
                      }
                    />
                  )}
                </div>
              </div>
            </article>
          </StFormSection>
        </StMain>
      </StWrapper>
      <StFooter>
        <StSessionSelector>
          {sessionType.map((type, index) => (
            <React.Fragment key={index}>
              <IcCheckBox
                isChecked={selectedSessionIndex === index}
                onClick={() =>
                  setSelectedSessionIndex(
                    selectedSessionIndex === index ? -1 : index,
                  )
                }
              />
              <div>
                <h3>{type.session}</h3>
                <p>{type.desc}</p>
              </div>
            </React.Fragment>
          ))}
        </StSessionSelector>
        <article>
          <Button type={'button'} text="취소하기" onClick={onClose} />
          <Button
            type={'submit'}
            text="세션 생성하기"
            onClick={() => !buttonDisabled && handleSubmit()}
            disabled={buttonDisabled}
          />
        </article>
      </StFooter>
    </>
  );
}

export default CreateSessionModal;

import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';

import { IcCheckBox, IcModalClose } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import IcDropdown from '@/components/common/icons/IcDropDown';
import { useCreateSession } from '@/hooks/useCreateSession';
import {
  partList,
  partTranslator,
  sessionTranslator,
  sessionType,
  times,
} from '@/utils/session';

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

interface Props {
  onClose: () => void;
}

function CreateSessionModal(props: Props) {
  const { onClose } = props;

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
  const [buttonClicked, setButtonClicked] = useState(false);

  const { createSession } = useCreateSession(part);

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

  /** 각각의 State 에 담아준 상태들을 객체화 시켜 post 하는 함수 */
  const handleSubmit = async () => {
    if (!buttonClicked) {
      setButtonClicked(true);

      const translatedPart = partTranslator[part];
      const translatedAttribute =
        sessionTranslator[sessionType[selectedSessionIndex].session];

      const submitContents = {
        part: translatedPart,
        name: sessionName,
        place: sessionLocation,
        startDate: `${date} ${startTime}`,
        endDate: `${date} ${endTime}`,
        attribute: translatedAttribute,
        generation: 32,
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
    setSelectedDate(date);

    if (date) {
      const year = date.getFullYear();
      const month = ('0' + (date.getMonth() + 1)).slice(-2);
      const day = ('0' + date.getDate()).slice(-2);

      const formattedDate = `${year}/${month}/${day}`;
      setDate(formattedDate);
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
              onItemSelected={handleSelectedPart}
              type={'select'}
            />
          )}
          <StFormSection>
            <article>
              <div className="form_container">
                <p>세션명</p>
                <StFormLayout hasValue={sessionName ? true : false}>
                  <input
                    placeholder="세션 이름을 입력해주세요"
                    onChange={(e) => handleSessionInfo(e, '세션 이름')}></input>
                </StFormLayout>
              </div>
              <div className="form_container">
                <p>세션 장소</p>
                <StFormLayout hasValue={sessionLocation ? true : false}>
                  <input
                    placeholder="세션이 열리는 장소를 입력해주세요"
                    onChange={(e) => handleSessionInfo(e, '세션 장소')}></input>
                </StFormLayout>
              </div>
            </article>
            <article>
              <div className="form_container">
                <p>세션 날짜</p>
                <StFormLayout hasValue={date ? true : false}>
                  <DatePicker
                    placeholderText="세션 날짜를 선택해주세요"
                    dateFormat="yyyy/MM/dd"
                    selected={selectedDate}
                    onChange={handleSessionDate}
                  />
                  <IcDropdown color={date ? '#3C3D40' : '#C0C5C9'} />
                </StFormLayout>
              </div>
              <div className="input_time">
                <div className="form_container">
                  <p>시작 시각</p>
                  <StFormLayout
                    onClick={() => setIsStartTimeOpen(!isStartTimeOpen)}
                    hasValue={true}>
                    <span>{startTime}</span>
                    <IcDropdown color="#3C3D40" />
                  </StFormLayout>
                  {isStartTimeOpen && (
                    <DropDown
                      list={times}
                      type={'times'}
                      onItemSelected={(time: string) =>
                        handleSelectedTime(time, 'startTime')
                      }
                    />
                  )}
                </div>
                <div className="form_container">
                  <p>종료 시각</p>
                  <StFormLayout
                    onClick={() => setIsEndTimeOpen(!isEndTimeOpen)}
                    hasValue={true}>
                    <span>{endTime}</span>
                    <IcDropdown color="#3C3D40" />
                  </StFormLayout>
                  {isEndTimeOpen && (
                    <DropDown
                      list={times}
                      type={'times'}
                      onItemSelected={(time: string) =>
                        handleSelectedTime(time, 'endTime')
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
              <label
                onClick={() =>
                  setSelectedSessionIndex(
                    selectedSessionIndex === index ? -1 : index,
                  )
                }>
                <h3>{type.session}</h3>
                <p>{type.desc}</p>
              </label>
            </React.Fragment>
          ))}
        </StSessionSelector>
        <article>
          <Button type={'button'} text="취소하기" onClick={onClose} />
          <Button
            type={'submit'}
            text="세션 생성하기"
            onClick={handleSubmit}
            disabled={buttonDisabled}
          />
        </article>
      </StFooter>
    </>
  );
}

export default CreateSessionModal;

import 'react-datepicker/dist/react-datepicker.css';

import { useCallback, useEffect, useState } from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';
import { useForm } from 'react-hook-form';

import { IcCheckBox, IcModalClose } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import IcDropdown from '@/components/common/icons/IcDropDown';
import { postNewSession } from '@/services/api/lecture';
import { getAuthHeader } from '@/utils/auth';
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

type Props = {
  onClose: () => void;
};

function CreateSessionModal({ onClose }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isPartOpen, setIsPartOpen] = useState<boolean>(false);
  const [isStartTimeOpen, setIsStartTimeOpen] = useState<boolean>(false);
  const [isEndTimeOpen, setIsEndTimeOpen] = useState<boolean>(false);

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
  const [buttonClicked, setButtonClicked] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      part: '파트선택',
      sessionName: '',
      sessionLocation: '',
      date: '',
      startTime: '14:00',
      endTime: '18:00',
      attribute: '',
    },
  });

  const onSubmit = async (data: any) => {
    const {
      part,
      sessionName,
      sessionLocation,
      date,
      startTime,
      endTime,
      attribute,
    } = data;

    const translatedPart = partTranslator[part];
    const translatedAttribute =
      sessionTranslator[sessionType[attribute].session];

    const submitContents = {
      part: translatedPart,
      name: sessionName,
      place: sessionLocation,
      startDate: `${date} ${startTime}`,
      endDate: `${date} ${endTime}`,
      attribute: translatedAttribute,
      generation: 32,
    };
    await postNewSession(submitContents, getAuthHeader());
    onClose();
  };

  const selectedSessionIndex = watch('attribute');

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
        <form>
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
                  <StFormLayout hasValue={sessionName ? true : false}>
                    <input {...register('sessionName')}>
                      placeholder="세션 이름을 입력해주세요"
                    </input>
                  </StFormLayout>
                </div>
                <div className="form_container">
                  <p>세션 장소</p>
                  <StFormLayout hasValue={sessionLocation ? true : false}>
                    <input
                      {...register('sessionLocation')}
                      placeholder="세션이 열리는 장소를 입력해주세요"></input>
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
                      onChange={handleDateChange}
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
                          handleTimeSelection(time, 'startTime')
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
                          handleTimeSelection(time, 'endTime')
                        }
                      />
                    )}
                  </div>
                </div>
              </article>
            </StFormSection>
          </StMain>
        </form>
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

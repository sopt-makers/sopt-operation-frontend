import 'react-datepicker/dist/react-datepicker.css';

import { useEffect, useState } from 'react';
import React from 'react';
import DatePicker from 'react-datepicker';

import { IcCheckBox, IcModalClose } from '@/assets/icons';
import DropDown from '@/components/common/DropDown';
import IcDropdown from '@/components/common/icons/IcDropDown';

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

const SESSION_TYPE = [
  {
    session: '세미나',
    desc: '미 출석시 출석점수 감점',
  },
  {
    session: '행사',
    desc: '출석 시 0.5점 부여',
  },
  {
    session: '기타',
    desc: '출석 점수 미반영',
  },
];

const PART_LIST = ['전체', '기획', '디자인', '서버', 'IOS', '안드로이드', '웹'];

type Props = {
  onClose: () => void;
};

function CreateSessionModal({ onClose }: Props) {
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number>(-1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [part, setPart] = useState<string>('파트선택');
  const [isDropdownOn, setIsDropdownOn] = useState<boolean>(false);

  useEffect(() => {
    console.log(`세션 실행 날짜 : ${selectedDate}`);
  }, [selectedDate]);

  useEffect(() => {
    if (selectedSessionIndex !== -1) {
      console.log(
        '현재 체크된 세션 값:',
        SESSION_TYPE[selectedSessionIndex].session,
      );
    } else {
      console.log('현재 체크된 세션 값: 없음');
    }
  }, [selectedSessionIndex]);

  function handlePartSelection(selectedPart: string) {
    setPart(selectedPart);
    setIsDropdownOn(false);
  }

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
          <StPartSelector onClick={() => setIsDropdownOn(!isDropdownOn)}>
            <StSelectedPart
              textColor={part === '파트선택' ? '#606265' : '#8040FF'}>
              {part}
            </StSelectedPart>
            <IcDropdown color={part === '파트선택' ? '#606265' : '#8040FF'} />
          </StPartSelector>
          {isDropdownOn && (
            <DropDown list={PART_LIST} onItemSelected={handlePartSelection} />
          )}

          <StFormSection>
            <article>
              <div className="form_container">
                <p>세션명</p>
                <StFormLayout>
                  <input placeholder="세션 이름을 입력해주세요"></input>
                </StFormLayout>
              </div>
              <div className="form_container">
                <p>세션 장소</p>
                <StFormLayout>
                  <input placeholder="세션이 열리는 장소를 입력해주세요"></input>
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
                    onChange={(date: Date | null) => setSelectedDate(date)}
                  />
                  <IcDropdown color="#3C3D40" />
                </StFormLayout>
              </div>
              <div className="input_time">
                <div className="form_container">
                  <p>시작 시각</p>
                  <StFormLayout>
                    <IcDropdown color="#3C3D40" />
                  </StFormLayout>
                </div>
                <div className="form_container">
                  <p>종료 시각</p>
                  <StFormLayout>
                    <IcDropdown color="#3C3D40" />
                  </StFormLayout>
                </div>
              </div>
            </article>
          </StFormSection>
        </StMain>
      </StWrapper>
      <StFooter>
        <StSessionSelector>
          {SESSION_TYPE.map((type, index) => (
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
      </StFooter>
    </>
  );
}

export default CreateSessionModal;

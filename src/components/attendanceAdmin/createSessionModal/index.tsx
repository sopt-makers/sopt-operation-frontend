import { useEffect, useState } from 'react';
import React from 'react';

import { IcCheckBox, IcModalClose } from '@/assets/icons';
import IcDropdown from '@/components/common/icons/IcDropDown';

import {
  StFooter,
  StFormLayout,
  StFormSection,
  StHeader,
  StMain,
  StPartSelector,
  StSessionSelector,
  StTitle,
  StWrapper,
} from './style';

function CreateSessionModal() {
  const [selectedSessionIndex, setSelectedSessionIndex] = useState<number>(-1);
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

  return (
    <>
      <StWrapper>
        <StHeader>
          <StTitle>
            <h1>세션 생성</h1>
            <IcModalClose />
          </StTitle>
          <h2>새로운 SOPT 세션을 생성합니다. 대상 파트를 선택해주세요.</h2>
        </StHeader>
        <StMain>
          <StPartSelector>
            <span>전체</span>
            <IcDropdown color="#8040FF" />
          </StPartSelector>
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
                <StFormLayout></StFormLayout>
              </div>
              <div className="input_time">
                <div className="form_container">
                  <p>시작 시각</p>
                  <StFormLayout></StFormLayout>
                </div>
                <div className="form_container">
                  <p>종료 시각</p>
                  <StFormLayout></StFormLayout>
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

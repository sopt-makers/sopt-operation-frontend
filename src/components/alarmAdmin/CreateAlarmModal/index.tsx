import React, { useState } from 'react';

import { IcNewDropdown } from '@/assets/icons';
import Button from '@/components/common/Button';
import DropDown from '@/components/common/DropDown';
import InputContainer from '@/components/common/inputContainer';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';

import {
  StAlarmModalWrapper,
  StAlarmTypeButton,
  StInput,
  StTargetUserSelector,
  StTextArea,
} from './style';

type DropdownType = 'part' | 'target' | 'batch';

const ALARM_TYPE = ['공지', '소식'];

const dropdownItems: {
  label: string;
  type: DropdownType;
  placeholder: string;
}[] = [
  { label: '파트', type: 'part', placeholder: '발송 파트' },
  { label: '발송 대상', type: 'target', placeholder: '활동 회원' },
  { label: '발송 기수', type: 'batch', placeholder: '33기' },
];

function CreateAlarmModal() {
  const [dropdownVisibility, setDropdownVisibility] = useState({
    part: false,
    target: false,
    batch: false,
  });

  const toggleDropdown = (type: 'part' | 'target' | 'batch') => {
    setDropdownVisibility((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <StAlarmModalWrapper>
      <ModalHeader title="알림 생성" desc="APP으로 발송할 알림을 생성합니다." />
      <main>
        <div className="type_selector">
          {ALARM_TYPE.map((type, idx) => (
            <StAlarmTypeButton key={idx} type="button">
              {type}
            </StAlarmTypeButton>
          ))}
        </div>
        <div className="dropdowns title">
          {dropdownItems.map((item) => (
            <div key={item.type}>
              <p>{item.label}</p>
              <StTargetUserSelector onClick={() => toggleDropdown(item.type)}>
                {item.placeholder}
                <IcNewDropdown />
              </StTargetUserSelector>
              {dropdownVisibility[item.type] && (
                <DropDown type={'select'} list={[]} />
              )}
            </div>
          ))}
        </div>
        <div className="inputs title">
          <div>
            <p>대상자 지정 여부</p>
            <StTargetUserSelector>
              대상자 전체
              <IcNewDropdown />
            </StTargetUserSelector>
          </div>
          <div>
            <p>알림 제목</p>
            <StInput
              type="text"
              placeholder="발송할 알림의 제목을 입력하세요."
            />
          </div>
          <div>
            <p>알림 내용</p>
            <StTextArea placeholder="발송할 알림의 내용을 입력하세요." />
          </div>
          <div>
            <p>링크 첨부</p>
            <StTargetUserSelector>
              이동할 링크를 선택하세요.
              <IcNewDropdown />
            </StTargetUserSelector>
          </div>
        </div>
      </main>
      <ModalFooter>
        <Button type={'button'} text="취소하기" />
        <Button type={'submit'} text="알림 생성하기" disabled={true} />
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default CreateAlarmModal;

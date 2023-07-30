import { IcCheckBox, IcModalClose } from '@/assets/icons';
import Button from '@/components/common/Button';
import InputContainer from '@/components/common/inputContainer';

import {
  StFooter,
  StHeader,
  StInformationSection,
  StTitle,
  StWrapper,
} from './style';

interface Props {
  onClose: () => void;
}

const SessionDetailModal = ({ onClose }: Props) => {
  return (
    <>
      <StWrapper>
        <StHeader>
          <StTitle>
            <h1>세션 정보</h1>
            <IcModalClose onClick={onClose} />
          </StTitle>
          <h2>생성된 SOPT 세션 정보를 조회합니다.</h2>
        </StHeader>
        <StInformationSection>
          <p>안드로이드</p>
          <div>
            <InputContainer title="세션명"></InputContainer>
            <InputContainer title="세션 장소"></InputContainer>
          </div>
          <div>
            <InputContainer title="세션 날짜"></InputContainer>
            <div className="time">
              <InputContainer title="시작 시각"></InputContainer>
              <InputContainer title="종료 시각"></InputContainer>
            </div>
          </div>
        </StInformationSection>
      </StWrapper>
      <StFooter>
        <div>
          <IcCheckBox isChecked={true} />
          <label>
            <h3>세미나</h3>
            <p>미 출석 시 출석 점수 감점</p>
          </label>
        </div>
        <Button type={'button'} text="세션 삭제하기" />
      </StFooter>
    </>
  );
};

export default SessionDetailModal;

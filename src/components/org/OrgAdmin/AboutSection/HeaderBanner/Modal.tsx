import { IconInfoCircle } from '@sopt-makers/icons';
import { MouseEvent } from 'react';

import {
  StInfoCloseButton,
  StInfoDescription,
  StInfoImg,
  StInfoSubDescription,
  StInfoTitle,
  StInfoWrapper,
} from './modal.style';

interface ModalProps {
  isInfoVisible: boolean;
  handleInfoToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Modal = ({ isInfoVisible, handleInfoToggle }: ModalProps) => {
  return (
    <StInfoWrapper isVisible={isInfoVisible}>
      <StInfoTitle>
        <IconInfoCircle />
        <span>소개탭 헤더</span>
        <StInfoCloseButton onClick={handleInfoToggle}>
          &#10005;
        </StInfoCloseButton>
      </StInfoTitle>
      <StInfoDescription>
        소개탭 가장 상단에 보이는 헤더 이미지예요.
      </StInfoDescription>
      <StInfoSubDescription>
        이번 기수의 핵심 가치가 돋보이는 이미지를 넣어주세요.
      </StInfoSubDescription>
      <StInfoImg
        src="/images/org/imgAboutHeaderInfo.png"
        alt="소개탭 헤더가 적용되는 예시 이미지"
        width={368}
        height={223}
      />
    </StInfoWrapper>
  );
};

export default Modal;

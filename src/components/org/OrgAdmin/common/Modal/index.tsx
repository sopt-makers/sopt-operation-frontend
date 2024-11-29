import { IconInfoCircle } from '@sopt-makers/icons';
import { MouseEvent } from 'react';

import {
  StInfoCloseButton,
  StInfoDescription,
  StInfoImg,
  StInfoSubDescription,
  StInfoTitle,
  StInfoWrapper,
} from './style';

interface ModalProps {
  title: string;
  description: string;
  subDescription: string;
  imgSrc: string;
  isInfoVisible: boolean;
  handleInfoToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Modal = ({
  title,
  description,
  subDescription,
  imgSrc,
  isInfoVisible,
  handleInfoToggle,
}: ModalProps) => {
  return (
    <StInfoWrapper isVisible={isInfoVisible}>
      <StInfoTitle>
        <IconInfoCircle />
        <span>{title}</span>
        <StInfoCloseButton onClick={handleInfoToggle}>
          &#10005;
        </StInfoCloseButton>
      </StInfoTitle>
      <StInfoDescription>{description}</StInfoDescription>
      <StInfoSubDescription>{subDescription}</StInfoSubDescription>
      <StInfoImg
        src={imgSrc}
        alt={`${title} 적용 예시`}
        width={368}
        height={223}
      />
    </StInfoWrapper>
  );
};

export default Modal;

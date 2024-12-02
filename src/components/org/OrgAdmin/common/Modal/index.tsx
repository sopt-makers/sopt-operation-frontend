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
  onInfoToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Modal = ({
  title,
  description,
  subDescription,
  imgSrc,
  isInfoVisible,
  onInfoToggle,
}: ModalProps) => {
  return (
    <StInfoWrapper isVisible={isInfoVisible} aria-hidden={!isInfoVisible}>
      <StInfoTitle>
        <IconInfoCircle />
        <span>{title}</span>
        <StInfoCloseButton onClick={onInfoToggle} aria-label="Close Modal">
          &#10005;
        </StInfoCloseButton>
      </StInfoTitle>
      <StInfoDescription>{description}</StInfoDescription>
      <StInfoSubDescription>{subDescription}</StInfoSubDescription>
      <StInfoImg src={imgSrc} alt={`${title} 적용 예시`} />
    </StInfoWrapper>
  );
};

export default Modal;

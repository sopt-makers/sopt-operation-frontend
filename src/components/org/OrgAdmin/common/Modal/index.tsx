import { IconInfoCircle } from '@sopt-makers/icons';
import { MouseEvent } from 'react';

import {
  StInfoCloseButton,
  StInfoContent,
  StInfoDescription,
  StInfoImg,
  StInfoSection,
  StInfoSubDescription,
  StInfoTitle,
  StInfoWrapper,
} from './style';

interface InfoSection {
  description: string;
  subDescription?: string;
  imgSrc: string;
}

interface ModalProps {
  title: string;
  description?: string;
  subDescription?: string;
  imgSrc?: string;
  sections?: InfoSection[];
  isInfoVisible: boolean;
  onInfoToggle: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Modal = ({
  title,
  description,
  subDescription,
  imgSrc,
  sections,
  isInfoVisible,
  onInfoToggle,
}: ModalProps) => {
  const infoSections =
    sections ??
    (description && imgSrc
      ? [
          {
            description,
            subDescription,
            imgSrc,
          },
        ]
      : []);

  return (
    <StInfoWrapper isVisible={isInfoVisible} aria-hidden={!isInfoVisible}>
      <StInfoTitle>
        <IconInfoCircle />
        <span>{title}</span>
        <StInfoCloseButton onClick={onInfoToggle} aria-label="Close Modal">
          &#10005;
        </StInfoCloseButton>
      </StInfoTitle>
      <StInfoContent>
        {infoSections.map((section) => (
          <StInfoSection key={`${section.description}-${section.imgSrc}`}>
            <div>
              <StInfoDescription>{section.description}</StInfoDescription>
              {section.subDescription && (
                <StInfoSubDescription>
                  {section.subDescription}
                </StInfoSubDescription>
              )}
            </div>
            <StInfoImg src={section.imgSrc} alt={`${title} 적용 예시`} />
          </StInfoSection>
        ))}
      </StInfoContent>
    </StInfoWrapper>
  );
};

export default Modal;

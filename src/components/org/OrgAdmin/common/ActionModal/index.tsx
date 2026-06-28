import { type HTMLAttributes } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

import Modal from '@/components/common/modal';

import {
  StLeftButton,
  StModalBtnWrapper,
  StModalContainer,
  StModalContent,
  StRightButton,
} from './style';

export type ActionModalVariant = 'default' | 'danger';

interface ActionModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  isOpen: boolean;
  title: string;
  description?: string;
  variant?: ActionModalVariant;
  leftButtonText?: string;
  rightButtonText?: string;
  onCancel?: () => void;
  onAction?: () => void | SubmitHandler<FieldValues>;
}

export const ActionModal = ({
  isOpen,
  title,
  description,
  variant = 'default',
  leftButtonText = '취소',
  rightButtonText = '확인',
  onCancel,
  onAction,
}: ActionModalProps) => {
  return (
    isOpen && (
      <Modal>
        <StModalContainer>
          <StModalContent>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </StModalContent>
          <StModalBtnWrapper>
            <StLeftButton type="button" onClick={() => onCancel?.()}>
              {leftButtonText}
            </StLeftButton>
            <StRightButton btntype={variant} onClick={() => onAction?.()}>
              {rightButtonText}
            </StRightButton>
          </StModalBtnWrapper>
        </StModalContainer>
      </Modal>
    )
  );
};

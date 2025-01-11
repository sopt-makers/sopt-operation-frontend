import { CheckBox } from '@sopt-makers/ui';
import { type HTMLAttributes, useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

import Modal from '@/components/common/modal';

import {
  StActionButton,
  StCancelButton,
  StModalBtnWrapper,
  StModalContainer,
} from './style';

interface ActionModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  isOpen: boolean;
  onCancel?: () => void;
  onAction?: () => void | SubmitHandler<FieldValues>;
  variant: 'add' | 'delete' | 'deploy';
  alertText: string;
  description?: string;
}

export const ActionModal = ({
  isOpen,
  onCancel,
  onAction,
  variant,
  alertText,
  description,
}: ActionModalProps) => {
  const [checked, setChecked] = useState(false);

  return (
    isOpen && (
      <Modal>
        <StModalContainer>
          <h2>{alertText}</h2>
          <p>{description}</p>
          <CheckBox
            label="확인했어요."
            checked={checked}
            onChange={() => setChecked((prev) => !prev)}
          />
          <StModalBtnWrapper>
            <StCancelButton
              onClick={() => {
                onCancel && onCancel();
                setChecked(false);
              }}>
              취소
            </StCancelButton>
            <StActionButton
              btntype={variant}
              disabled={!checked}
              onClick={() => {
                setChecked(false);
                onAction && onAction();
              }}>
              {variant === 'add'
                ? '추가'
                : variant === 'delete'
                  ? '삭제'
                  : '배포'}
            </StActionButton>
          </StModalBtnWrapper>
        </StModalContainer>
      </Modal>
    )
  );
};

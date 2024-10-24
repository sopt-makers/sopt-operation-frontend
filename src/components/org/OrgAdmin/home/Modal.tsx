'use client';

import { CheckBox, TextField } from '@sopt-makers/ui';
import { useState } from 'react';

import Modal from '@/components/common/modal';
import ImageInput from '@/components/org/OrgAdmin/home/ImageInput';
import {
  StActionButton,
  StAddButton,
  StAddModalBtnWrapper,
  StAddModalContainer,
  StCancelButton,
  StModalBtnWrapper,
  StModalContainer,
} from '@/components/org/OrgAdmin/home/Modal.style';
import { useBooleanState } from '@/hooks/useBooleanState';

/** 최신 소식 추가 모달 */
type AddNewsModalProps = {
  isOpen: boolean;
  onCancel?: () => void;
  onAdd?: () => void;
};

export const AddNewsModal = ({
  isOpen,
  onCancel,
  onAdd,
}: AddNewsModalProps) => {
  const {
    flag: isConfirmModalOpen,
    setTrue: openConfirmModal,
    setFalse: closeConfirmModal,
  } = useBooleanState();

  return (
    isOpen && (
      <Modal>
        <StAddModalContainer>
          <ImageInput
            label="이미지"
            description="이미지는 00x00 비율로 올려주세요."
          />
          <TextField
            value=""
            required
            labelText="최신 소식 제목"
            placeholder="최신 소식의 제목을 입력하세요."
          />
          <TextField
            value=""
            labelText="링크 첨부"
            placeholder="링크를 입력하세요."
          />

          <StAddModalBtnWrapper>
            <StCancelButton onClick={onCancel}>취소</StCancelButton>
            <StAddButton onClick={openConfirmModal}>추가</StAddButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>

        {isConfirmModalOpen && (
          <ActionModal
            type="add"
            isOpen={isConfirmModalOpen}
            onCancel={closeConfirmModal}
            onAction={() => {}}
            alertText="추가하시겠습니까?"
            description="최신 소식은 '배포'버튼을 거치지 않고 즉시 배포가 돼요."
          />
        )}
      </Modal>
    )
  );
};

type ActionModalProps = {
  isOpen: boolean;
  onCancel?: () => void;
  onAction?: () => void;
  type: 'delete' | 'add';

  alertText: string;
  description?: string;
};

export const ActionModal = ({
  isOpen,
  onCancel,
  onAction,
  type,
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
            <StCancelButton onClick={onCancel}>취소</StCancelButton>
            <StActionButton
              btnType={type}
              disabled={!checked}
              onClick={onAction}>
              {type === 'add' ? '추가' : '삭제'}
            </StActionButton>
          </StModalBtnWrapper>
        </StModalContainer>
      </Modal>
    )
  );
};

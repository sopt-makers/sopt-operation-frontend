'use client';

import { TextField } from '@sopt-makers/ui';

import Modal from '@/components/common/modal';
import ImageInput from '@/components/org/OrgAdmin/home/ImageInput';
import {
  StAddModalBtnWrapper,
  StAddModalContainer,
  StCancelButton,
  StDeleteButton,
  StModalBtnWrapper,
  StModalContainer,
} from '@/components/org/OrgAdmin/home/Modal.style';

type DeleteModalProps = {
  isOpen: boolean;
  onCancel?: () => void;
  onDelete?: () => void;
};

export const DeleteModal = ({
  isOpen,
  onCancel,
  onDelete,
}: DeleteModalProps) => {
  return (
    isOpen && (
      <Modal>
        <StModalContainer>
          <h2>삭제하시겠습니까?</h2>
          <p>삭제한 최신 소식은 복구되지 않아요.</p>
          <StModalBtnWrapper>
            <StCancelButton onClick={onCancel}>취소</StCancelButton>
            <StDeleteButton onClick={onDelete}>삭제</StDeleteButton>
          </StModalBtnWrapper>
        </StModalContainer>
      </Modal>
    )
  );
};

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
            <StDeleteButton onClick={onAdd}>추가</StDeleteButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>
      </Modal>
    )
  );
};

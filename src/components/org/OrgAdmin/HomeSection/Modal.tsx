'use client';

import { CheckBox, TextField } from '@sopt-makers/ui';
import { HTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Modal from '@/components/common/modal';
import ImageInput from '@/components/org/OrgAdmin/HomeSection/ImageInput';
import {
  StActionButton,
  StAddButton,
  StAddModalBtnWrapper,
  StAddModalContainer,
  StCancelButton,
  StModalBtnWrapper,
  StModalContainer,
} from '@/components/org/OrgAdmin/HomeSection/Modal.style';
import { useAddNewsMutation } from '@/components/org/OrgAdmin/HomeSection/queries';
import { useBooleanState } from '@/hooks/useBooleanState';

/** 최신 소식 추가 모달 */
type AddNewsModalProps = {
  isOpen: boolean;
  onCancel?: () => void;
};

export const AddNewsModal = ({ isOpen, onCancel }: AddNewsModalProps) => {
  const {
    flag: isConfirmModalOpen,
    setTrue: openConfirmModal,
    setFalse: closeConfirmModal,
  } = useBooleanState();

  const { mutate } = useAddNewsMutation();

  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const { getValues } = useFormContext();

  const handleCloseModal = () => {
    closeConfirmModal();

    setTitle('');
    setLink('');

    onCancel?.();
  };

  const handleSubmit = () => {
    const data = new FormData();

    data.append('image', getValues('newsImage')?.file);
    data.append('title', title);
    data.append('link', link);

    mutate(data, {
      onSuccess: () => {
        handleCloseModal();
      },
    });
  };

  return (
    isOpen && (
      <Modal>
        <StAddModalContainer>
          <ImageInput
            label="newsImage"
            description="이미지는 00x00 비율로 올려주세요."
          />
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            labelText="최신 소식 제목"
            placeholder="최신 소식의 제목을 입력하세요."
          />
          <TextField
            value={link}
            onChange={(e) => setLink(e.target.value)}
            labelText="링크 첨부"
            placeholder="링크를 입력하세요."
          />

          <StAddModalBtnWrapper>
            <StCancelButton onClick={handleCloseModal}>취소</StCancelButton>
            <StAddButton
              type="button"
              disabled={!getValues('newsImage') || !title}
              onClick={openConfirmModal}>
              추가
            </StAddButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>

        {isConfirmModalOpen && (
          <ActionModal
            id="add news"
            variant="add"
            isOpen={isConfirmModalOpen}
            onCancel={closeConfirmModal}
            onAction={handleSubmit}
            alertText="추가하시겠습니까?"
            description="최신 소식은 '배포'버튼을 거치지 않고 즉시 배포가 돼요."
          />
        )}
      </Modal>
    )
  );
};

interface ActionModalProps extends Omit<HTMLAttributes<HTMLDivElement>, 'id'> {
  isOpen: boolean;
  onCancel?: () => void;
  onAction?: () => void;
  id?: number | string;
  variant: 'add' | 'delete';
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
            <StCancelButton onClick={onCancel}>취소</StCancelButton>
            <StActionButton
              btntype={variant}
              disabled={!checked}
              onClick={onAction}>
              {variant === 'add' ? '추가' : '삭제'}
            </StActionButton>
          </StModalBtnWrapper>
        </StModalContainer>
      </Modal>
    )
  );
};

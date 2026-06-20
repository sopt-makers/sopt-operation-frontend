'use client';

import { TextField } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Modal from '@/components/common/modal';
import ImageInput from '@/components/org/OrgAdmin/HomeSection/_components/Modal/ImageInput';
import {
  StAddButton,
  StAddModalBtnWrapper,
  StAddModalContainer,
  StAddModalTitle,
  StCancelButton,
  StLinkTextArea,
} from '@/components/org/OrgAdmin/HomeSection/_components/Modal/style';
import { useAddNewsMutation } from '@/components/org/OrgAdmin/HomeSection/queries';

type AddNewsModalProps = {
  isOpen: boolean;
  onCancel?: () => void;
};

export const AddNewsModal = ({ isOpen, onCancel }: AddNewsModalProps) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const { mutate } = useAddNewsMutation();

  const { getValues, setValue } = useFormContext();

  const handleCloseModal = () => {
    setTitle('');
    setLink('');
    setValue('newsImage', null);

    onCancel?.();
  };

  const handleSubmit = () => {
    const file = getValues('newsImage')?.file;

    if (!file || !title) {
      return;
    }

    mutate({ file, title, link }, { onSuccess: () => handleCloseModal() });
  };

  return (
    isOpen && (
      <Modal>
        <StAddModalContainer>
          <StAddModalTitle>최신 소식</StAddModalTitle>
          <ImageInput
            label="newsImage"
            description="이미지는 286x381 비율로 올려주세요"
          />
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            labelText="최신 소식 제목"
            placeholder="최신 소식의 제목을 입력해 주세요"
          />
          <StLinkTextArea
            value={link}
            onChange={(e) => setLink(e.target.value)}
            topAddon={{ labelText: '링크 첨부' }}
            placeholder="링크를 입력해 주세요"
            maxHeight={120}
          />

          <StAddModalBtnWrapper>
            <StCancelButton onClick={handleCloseModal}>취소</StCancelButton>
            <StAddButton
              type="button"
              disabled={!getValues('newsImage') || !title}
              onClick={handleSubmit}>
              추가
            </StAddButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>
      </Modal>
    )
  );
};

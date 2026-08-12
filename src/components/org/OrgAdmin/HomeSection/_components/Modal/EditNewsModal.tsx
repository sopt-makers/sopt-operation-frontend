'use client';

import { TextField } from '@sopt-makers/ui';
import { useEffect } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';

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
import {
  useEditNewsMutation,
  useNewsQuery,
} from '@/components/org/OrgAdmin/HomeSection/queries';

type EditNewsModalProps = {
  isOpen: boolean;
  newsId?: number;
  onCancel?: () => void;
};

const EDIT_NEWS_TITLE_FIELD = 'editNewsTitle';
const EDIT_NEWS_LINK_FIELD = 'editNewsLink';

export const EditNewsModal = ({
  isOpen,
  newsId,
  onCancel,
}: EditNewsModalProps) => {
  const { data: news, isLoading: isNewsLoading } = useNewsQuery(
    isOpen ? newsId : undefined,
  );
  const { mutate, isLoading: isEditLoading } = useEditNewsMutation();

  const { control, getValues, setValue } = useFormContext();
  const newsImage = useWatch({ control, name: 'newsImage' });
  const title = useWatch({ control, name: EDIT_NEWS_TITLE_FIELD });
  const link = useWatch({ control, name: EDIT_NEWS_LINK_FIELD });

  useEffect(() => {
    if (!isOpen || !news) {
      return;
    }

    setValue(EDIT_NEWS_TITLE_FIELD, news.title);
    setValue(EDIT_NEWS_LINK_FIELD, news.link);
    setValue('newsImage', { previewUrl: news.image });
  }, [isOpen, news, setValue]);

  const handleCloseModal = () => {
    setValue(EDIT_NEWS_TITLE_FIELD, '');
    setValue(EDIT_NEWS_LINK_FIELD, '');
    setValue('newsImage', null);

    onCancel?.();
  };

  const handleSubmit = () => {
    const image = getValues('newsImage');

    if (!newsId || !title || !image?.previewUrl) {
      return;
    }

    mutate(
      {
        id: newsId,
        file: image.file,
        existingImageUrl: news?.image,
        title,
        link: link ?? '',
      },
      { onSuccess: () => handleCloseModal() },
    );
  };

  const isSubmitDisabled =
    isNewsLoading || isEditLoading || !newsId || !newsImage || !title;

  return (
    isOpen && (
      <Modal>
        <StAddModalContainer>
          <StAddModalTitle>최신 소식</StAddModalTitle>
          <ImageInput
            label="newsImage"
            description="이미지는 286x381 비율로 올려주세요"
          />
          <Controller
            name={EDIT_NEWS_TITLE_FIELD}
            control={control}
            render={({ field }) => (
              <TextField
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value)}
                required
                labelText="최신 소식 제목"
                placeholder="최신 소식의 제목을 입력해 주세요"
              />
            )}
          />
          <Controller
            name={EDIT_NEWS_LINK_FIELD}
            control={control}
            render={({ field }) => (
              <StLinkTextArea
                value={field.value ?? ''}
                onChange={(e) => field.onChange(e.target.value)}
                topAddon={{ labelText: '링크 첨부' }}
                placeholder="링크를 입력해 주세요"
                maxHeight={120}
              />
            )}
          />

          <StAddModalBtnWrapper>
            <StCancelButton onClick={handleCloseModal}>취소</StCancelButton>
            <StAddButton
              type="button"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}>
              수정
            </StAddButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>
      </Modal>
    )
  );
};

'use client';

import { TextField } from '@sopt-makers/ui';
import { useLayoutEffect, useRef, useState } from 'react';

import Modal from '@/components/common/modal';
import {
  StAddButton,
  StAddModalBtnWrapper,
  StAddModalContainer,
  StAddModalTitle,
  StCancelButton,
  StLinkTextArea,
  StTextAreaWrapper,
} from '@/components/org/OrgAdmin/HomeSection/_components/Modal/style';
import {
  EMPTY_REVIEW,
  REVIEW_CONTENT_MAX_HEIGHT,
  REVIEW_CONTENT_MIN_HEIGHT,
} from '@/components/org/OrgAdmin/HomeSection/_constants/constants';
import { ReviewForm } from '@/components/org/OrgAdmin/HomeSection/_types/types';
import {
  useEditReviewMutation,
  useReviewQuery,
} from '@/components/org/OrgAdmin/HomeSection/queries';

type EditReviewModalProps = {
  isOpen: boolean;
  reviewId?: number;
  onCancel?: () => void;
};

export const EditReviewModal = ({
  isOpen,
  reviewId,
  onCancel,
}: EditReviewModalProps) => {
  const [editedReview, setEditedReview] = useState<ReviewForm | null>(null);
  const contentTextAreaRef = useRef<HTMLDivElement>(null);

  const { data: reviewData, isLoading: isReviewLoading } = useReviewQuery(
    isOpen ? reviewId : undefined,
  );
  const { mutate, isLoading: isEditLoading } = useEditReviewMutation();

  const review =
    editedReview ??
    (reviewData
      ? {
          title: reviewData.title,
          content: reviewData.content ?? '',
          authorInfo: reviewData.authorInfo ?? '',
        }
      : EMPTY_REVIEW);

  useLayoutEffect(
    function syncReviewContentHeight() {
      if (!isOpen) {
        return;
      }

      const textarea = contentTextAreaRef.current?.querySelector('textarea');
      if (!textarea) {
        return;
      }

      textarea.style.height = 'auto';
      const measuredHeight = Math.min(
        Math.max(textarea.scrollHeight, REVIEW_CONTENT_MIN_HEIGHT),
        REVIEW_CONTENT_MAX_HEIGHT,
      );

      textarea.style.height = `${measuredHeight}px`;
    },
    [isOpen, review.content],
  );

  const handleCloseModal = () => {
    setEditedReview(null);
    onCancel?.();
  };

  const handleSubmit = () => {
    if (!reviewId || !review.title || !review.content || !review.authorInfo) {
      return;
    }

    const formData = new FormData();
    formData.append('title', review.title);
    formData.append('content', review.content);
    formData.append('authorInfo', review.authorInfo);

    mutate({ id: reviewId, formData }, { onSuccess: () => handleCloseModal() });
  };

  const isSubmitDisabled =
    isReviewLoading ||
    isEditLoading ||
    !reviewId ||
    !review.title ||
    !review.content ||
    !review.authorInfo;

  return (
    isOpen && (
      <Modal>
        <StAddModalContainer>
          <StAddModalTitle>리뷰</StAddModalTitle>
          <TextField
            value={review.title}
            onChange={(e) =>
              setEditedReview({ ...review, title: e.target.value })
            }
            required
            labelText="리뷰 제목"
            descriptionText="공백 포함 최대 10자까지 작성할 수 있어요"
            placeholder="ex. 후회없는 활동"
          />
          <StTextAreaWrapper ref={contentTextAreaRef}>
            <StLinkTextArea
              value={review.content}
              onChange={(e) =>
                setEditedReview({ ...review, content: e.target.value })
              }
              required
              topAddon={{
                labelText: '리뷰 내용',
                descriptionText: '공백 포함 최대 200자까지 작성할 수 있어요',
              }}
              placeholder="ex. 좋은 사람들도 많이 만났고 기획분야를 제대로 배울 수 있었던 기회였어요. 대학생활 마지막 대외 활동이었지만, 회사 일을 하면서도 미련을 못버리고 메이커스나 솝텀을 기웃거려요. 엄청 오랜 기간동안 애정을 담고 있는 단체예요."
              maxHeight={REVIEW_CONTENT_MAX_HEIGHT}
            />
          </StTextAreaWrapper>
          <TextField
            value={review.authorInfo}
            onChange={(e) =>
              setEditedReview({ ...review, authorInfo: e.target.value })
            }
            required
            labelText="리뷰어 정보"
            descriptionText={
              '"{이름} | {활동기수}기 활동 | {파트명}" 형식으로 작성해 주세요'
            }
            placeholder="ex. 김솝트 | 36, 39기 활동 | 웹"
          />

          <StAddModalBtnWrapper>
            <StCancelButton onClick={handleCloseModal}>취소</StCancelButton>
            <StAddButton
              type="button"
              disabled={isSubmitDisabled}
              onClick={handleSubmit}>
              저장
            </StAddButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>
      </Modal>
    )
  );
};

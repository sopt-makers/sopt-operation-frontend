 'use client';

import { TextArea, TextField } from '@sopt-makers/ui';
import { useState } from 'react';

import Modal from '@/components/common/modal';
import {
  StAddButton,
  StAddModalBtnWrapper, StAddModalContainer, StAddModalTitle, StCancelButton,
  StDescription,
  StLabel,
  StTextAreaWrapper
} from '@/components/org/OrgAdmin/HomeSection/_components/Modal/style';
import { ReviewForm } from '@/components/org/OrgAdmin/HomeSection/_types/types';

type EditReviewModalProps = {
  isOpen: boolean;

};

export const EditReviewModal = ({ isOpen }: EditReviewModalProps) => {
    const [review, setReview] = useState<ReviewForm>({
        title: '',
        content: '',
        authorInfo: '',
    });

  const handleCloseModal = () => {
    setReview({
        title: '',
        content: '',
        authorInfo: '',
    });
  };

  const handleSubmit = () => {
    if (!review.title || !review.content || !review.authorInfo) {
      return;
    }

    // TODO: 리뷰 수정 API 호출

  };

  return (
    isOpen && (
      <Modal>
        <StAddModalContainer>
          <StAddModalTitle>리뷰</StAddModalTitle>
          <TextField
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            required
            labelText="리뷰 제목"
            descriptionText="공백 포함 최대 10자까지 작성할 수 있어요"
            placeholder="ex. 후회없는 활동"
          />
          <StTextAreaWrapper>
            <StLabel>리뷰 내용</StLabel>
            <StDescription>공백 포함 최대 200자까지 작성할 수 있어요</StDescription>
          <TextArea
            value={review.content}
            onChange={(e) => setReview({ ...review, content: e.target.value })}
            required
            placeholder="ex. 좋은 사람들도 많이 만났고 기획분야를 제대로 배울 수 있었던 기회였어요. 대학생활 마지막 대외 활동이었지만, 회사 일을 하면서도 미련을 못버리고 메이커스나 솝텀을 기웃거려요. 엄청 오랜 기간동안 애정을 담고 있는 단체예요."
          />
          </StTextAreaWrapper>
          <TextField
            value={review.title}
            onChange={(e) => setReview({ ...review, title: e.target.value })}
            required
            labelText="리뷰어 정보"
            descriptionText={`"{이름} | {활동기수}기 활동 | {파트명}" 형식으로 작성해 주세요`}
            placeholder="ex. 김솝트 | 36, 39기 활동 | 웹"
          />

          <StAddModalBtnWrapper>
            <StCancelButton onClick={handleCloseModal}>취소</StCancelButton>
            <StAddButton
              type="button"
              disabled={!review.title || !review.content}
              onClick={handleSubmit}>
              저장
            </StAddButton>
          </StAddModalBtnWrapper>
        </StAddModalContainer>
      </Modal>
    )
  );
};

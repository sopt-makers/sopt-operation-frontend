'use client';

import { IconInfoCircle } from '@sopt-makers/icons';
import { useState } from 'react';

import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import { EditReviewModal } from '@/components/org/OrgAdmin/HomeSection/_components/Modal/EditReviewModal';
import { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';
import {
  StContentWrapper,
  StDescription,
  StInfoButton,
  StInputLabel,
  StReviewList,
  StReviewModalWrapper,
  StSectionWrapper,
  StTitle,
  StWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';

import ReviewItem from './ReviewItem';

interface Props {
  reviews: Review[];
  onChangeReviews: (reviews: Review[]) => void;
  isEditable: boolean;
}

const ReviewSection = ({ reviews, onChangeReviews, isEditable }: Props) => {
  const [editReviewId, setEditReviewId] = useState<number>();

  const { isInfoVisible, onInfoToggle } = useModal();

  return (
    <StSectionWrapper>
      <StWrapper>
        <StTitle>
          <h2>리뷰</h2>
          <StInfoButton onClick={onInfoToggle}>
            <IconInfoCircle />
          </StInfoButton>
        </StTitle>
        <StContentWrapper>
          <StInputLabel>
            <span>타이틀 및 리뷰</span>
            <RequiredIcon />
          </StInputLabel>
          <StDescription>
            홈의 ‘Review’속 내용을 수정할 수 있어요. 좌측 핸들로 순서를 조정할
            수 있어요.
          </StDescription>

          <StReviewList
            axis="y"
            values={reviews}
            onReorder={
              isEditable ? (items) => onChangeReviews(items) : () => undefined
            }>
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                onEdit={() => setEditReviewId(review.id)}
                disabled={!isEditable}
              />
            ))}
          </StReviewList>
        </StContentWrapper>
      </StWrapper>

      <StReviewModalWrapper>
        <Modal
          title="리뷰"
          description="메인 홈 ‘Review’ 속 내용을 수정하고 추가할 수 있어요."
          subDescription="리스트 순서대로 7개가 배치돼요. 리뷰를 최신 기수의 내용으로 관리해보세요. "
          imgSrc="/images/org/imgReview.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StReviewModalWrapper>
      <EditReviewModal
        isOpen={editReviewId != null}
        reviewId={editReviewId}
        onCancel={() => setEditReviewId(undefined)}
        onSuccess={(updatedReview) => {
          onChangeReviews(
            reviews.map((review) =>
              review.id === editReviewId
                ? { ...review, ...updatedReview }
                : review,
            ),
          );
        }}
      />
    </StSectionWrapper>
  );
};

export default ReviewSection;

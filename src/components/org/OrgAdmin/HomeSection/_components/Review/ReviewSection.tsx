import { IconInfoCircle } from '@sopt-makers/icons';
import { useEffect } from 'react';

import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
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

import useDragList from '@/components/org/OrgAdmin/HomeSection/_hooks/useDragList';

import ReviewItem from './ReviewItem';
import { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';

interface Props {
  reviews: Review[];
  onChangeReviews?: (reviews: Review[]) => void;
}

const ReviewSection = ({ reviews: initialReviews, onChangeReviews }: Props) => {
  const { isInfoVisible, onInfoToggle } = useModal();

  const {
    items: reviews,
    draggingId: draggingReviewId,
    onDragStart: handleReviewDragStart,
    onDragEnd: handleReviewDragEnd,
    onDragOver: handleReviewDragOver,
    onDrop: handleReviewDrop,
  } = useDragList(initialReviews);

  useEffect(() => {
    onChangeReviews?.(reviews);
  }, [onChangeReviews, reviews]);

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
          
          <StReviewList>
            {reviews.map((review) => (
              <ReviewItem
                key={review.id}
                review={review}
                isDragging={draggingReviewId === review.id}
                onDragStart={(event) => handleReviewDragStart(event, review.id)}
                onDragEnd={handleReviewDragEnd}
                onDragOver={handleReviewDragOver}
                onDrop={(event) => handleReviewDrop(event, review.id)}
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
    </StSectionWrapper>
  );
};

export default ReviewSection;

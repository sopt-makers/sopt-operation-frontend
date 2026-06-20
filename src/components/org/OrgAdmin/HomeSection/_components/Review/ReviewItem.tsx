'use client';

import { IconEdit } from '@sopt-makers/icons';
import { useDragControls } from 'framer-motion';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StReviewContent,
  StReviewDragHandle,
  StReviewEditButton,
  StReviewReorderItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/Review/style';
import { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';

type ReviewItemProps = {
  review: Review;
  onEdit?: () => void;
  disabled?: boolean;
};

const ReviewItem = ({ review, onEdit, disabled = false }: ReviewItemProps) => {
  const dragControls = useDragControls();

  return (
    <StReviewReorderItem
      value={review}
      drag={disabled ? false : 'y'}
      dragControls={dragControls}
      dragListener={false}
      whileDrag={{ opacity: 0.5 }}>
      <StReviewDragHandle
        type="button"
        disabled={disabled}
        aria-label={`${review.title} 순서 변경`}
        onPointerDown={(event) => {
          if (!disabled) {
            dragControls.start(event);
          }
        }}>
        <HandleIcon />
      </StReviewDragHandle>
      <StReviewContent>{review.title}</StReviewContent>
      <StReviewEditButton
        type="button"
        disabled={disabled}
        onClick={disabled ? undefined : onEdit}
        aria-label={`${review.title} 수정`}>
        <IconEdit />
      </StReviewEditButton>
    </StReviewReorderItem>
  );
};

export default ReviewItem;

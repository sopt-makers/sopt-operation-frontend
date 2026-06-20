import { IconEdit } from '@sopt-makers/icons';
import type { ComponentPropsWithoutRef, DragEvent } from 'react';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StReviewContent,
  StReviewDragHandle,
  StReviewEditButton,
  StReviewItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/Review/style';
import { Review } from '@/components/org/OrgAdmin/HomeSection/_types/types';

type ReviewItemProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'onDragStart' | 'onDragEnd' | 'onDragOver' | 'onDrop'
> & {
  review: Review;
  isDragging: boolean;
  onDragStart: (event: DragEvent<HTMLButtonElement>, reviewId: number) => void;
  onDragEnd: () => void;
  onDragOver: (event: DragEvent<HTMLLIElement>) => void;
  onDrop: (event: DragEvent<HTMLLIElement>, reviewId: number) => void;
  onEdit?: () => void;
  disabled?: boolean;
};

const ReviewItem = ({
  review,
  isDragging,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
  onEdit,
  disabled = false,
  ...props
}: ReviewItemProps) => {
  return (
    <StReviewItem
      $isDragging={isDragging}
      onDragOver={disabled ? undefined : onDragOver}
      onDrop={disabled ? undefined : (event) => onDrop(event, review.id)}
      {...props}>
      <StReviewDragHandle
        type="button"
        draggable={!disabled}
        disabled={disabled}
        aria-label={`${review.title} 순서 변경`}
        onDragStart={
          disabled ? undefined : (event) => onDragStart(event, review.id)
        }
        onDragEnd={disabled ? undefined : onDragEnd}>
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
    </StReviewItem>
  );
};

export default ReviewItem;

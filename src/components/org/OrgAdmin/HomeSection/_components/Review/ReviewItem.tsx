import { IconEdit } from '@sopt-makers/icons';
import type { ComponentPropsWithoutRef } from 'react';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StReviewContent,
  StReviewDragHandle,
  StReviewEditButton,
  StReviewItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/Review/style';
import {
  type DragHandlers,
  Review,
} from '@/components/org/OrgAdmin/HomeSection/_types/types';

type ReviewItemProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'onDragStart' | 'onDragEnd' | 'onDragOver' | 'onDrop'
> & {
  review: Review;
  isDragging: boolean;
  dragHandlers: DragHandlers;
  onEdit?: () => void;
  disabled?: boolean;
};

const ReviewItem = ({
  review,
  isDragging,
  dragHandlers,
  onEdit,
  disabled = false,
  ...props
}: ReviewItemProps) => {
  const { onDragStart, onDragEnd, onDragOver, onDrop } = dragHandlers;

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

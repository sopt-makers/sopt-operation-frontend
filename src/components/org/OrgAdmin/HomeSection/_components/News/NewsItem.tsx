import type { ComponentPropsWithoutRef } from 'react';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StButtonWrapper,
  StIconEdit,
  StIconTrash,
  StNewsContent,
  StNewsDragHandle,
  StNewsItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/style';
import type { DragHandlers } from '@/components/org/OrgAdmin/HomeSection/_types/types';

export type News = {
  id: number;
  title: string;
};

type NewsItemProps = Omit<
  ComponentPropsWithoutRef<'li'>,
  'onDragOver' | 'onDrop'
> & {
  news: News;
  isDragging: boolean;
  dragHandlers: DragHandlers;
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const NewsItem = ({
  news,
  isDragging,
  dragHandlers,
  onEdit,
  onDelete,
  disabled = false,
  ...props
}: NewsItemProps) => {
  const { onDragStart, onDragEnd, onDragOver, onDrop } = dragHandlers;

  return (
    <StNewsItem
      $isDragging={isDragging}
      onDragOver={disabled ? undefined : onDragOver}
      onDrop={disabled ? undefined : (event) => onDrop(event, news.id)}
      {...props}>
      <StNewsDragHandle
        type="button"
        draggable={!disabled}
        disabled={disabled}
        aria-label={`${news.title} 순서 변경`}
        onDragStart={
          disabled ? undefined : (event) => onDragStart(event, news.id)
        }
        onDragEnd={disabled ? undefined : onDragEnd}>
        <HandleIcon />
      </StNewsDragHandle>

      <StNewsContent>{news.title}</StNewsContent>

      <StButtonWrapper>
        <StIconEdit
          role="button"
          aria-label={`${news.title} 수정 버튼`}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          $isDisabled={disabled}
          onKeyDown={(e) => !disabled && e.key === 'Enter' && onEdit?.()}
          onClick={disabled ? undefined : onEdit}
        />
        <StIconTrash
          role="button"
          aria-label={`${news.title} 삭제 버튼`}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
          $isDisabled={disabled}
          onKeyDown={(e) => !disabled && e.key === 'Enter' && onDelete?.()}
          onClick={disabled ? undefined : onDelete}
        />
      </StButtonWrapper>
    </StNewsItem>
  );
};

export default NewsItem;

import type { ComponentPropsWithoutRef, DragEvent } from 'react';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StButtonWrapper,
  StIconEdit,
  StIconTrash,
  StNewsContent,
  StNewsDragHandle,
  StNewsItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/style';

export type News = {
  id: number;
  title: string;
};

type NewsItemProps = ComponentPropsWithoutRef<'li'> & {
  news: News;
  isDragging: boolean;
  onNewsDragStart: (
    event: DragEvent<HTMLButtonElement>,
    newsId: number,
  ) => void;
  onNewsDragEnd: () => void;
  onNewsDragOver: (event: DragEvent<HTMLLIElement>) => void;
  onNewsDrop: (event: DragEvent<HTMLLIElement>, newsId: number) => void;
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const NewsItem = ({
  news,
  isDragging,
  onNewsDragStart,
  onNewsDragEnd,
  onNewsDragOver,
  onNewsDrop,
  onEdit,
  onDelete,
  disabled = false,
  ...props
}: NewsItemProps) => {
  return (
    <StNewsItem
      $isDragging={isDragging}
      onDragOver={disabled ? undefined : onNewsDragOver}
      onDrop={disabled ? undefined : (event) => onNewsDrop(event, news.id)}
      {...props}>
      <StNewsDragHandle
        type="button"
        draggable={!disabled}
        disabled={disabled}
        aria-label={`${news.title} 순서 변경`}
        onDragStart={
          disabled ? undefined : (event) => onNewsDragStart(event, news.id)
        }
        onDragEnd={disabled ? undefined : onNewsDragEnd}>
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

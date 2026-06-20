import type { ComponentPropsWithoutRef, DragEvent } from 'react';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StNewsContent,
  StNewsDragHandle,
  StNewsItem,
  StButtonWrapper,
  StIconEdit,
  StIconTrash,
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
  ...props
}: NewsItemProps) => {
  return (
    <StNewsItem
      $isDragging={isDragging}
      onDragOver={onNewsDragOver}
      onDrop={(event) => onNewsDrop(event, news.id)}
      {...props}>
      <StNewsDragHandle
        type="button"
        draggable
        aria-label={`${news.title} 순서 변경`}
        onDragStart={(event) => onNewsDragStart(event, news.id)}
        onDragEnd={onNewsDragEnd}>
        <HandleIcon />
      </StNewsDragHandle>

      <StNewsContent>{news.title}</StNewsContent>

      <StButtonWrapper>
        <StIconEdit
          role="button"
          aria-label={`${news.title} 수정 버튼`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onEdit?.()}
          onClick={onEdit}
        />
        <StIconTrash
          role="button"
          aria-label={`${news.title} 삭제 버튼`}
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onDelete?.()}
          onClick={onDelete}
        />
      </StButtonWrapper>
    </StNewsItem>
  );
};

export default NewsItem;

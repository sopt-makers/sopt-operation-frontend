'use client';

import { useDragControls } from 'framer-motion';

import HandleIcon from '@/components/org/OrgAdmin/assets/HandleIcon';
import {
  StButtonWrapper,
  StIconEdit,
  StIconTrash,
  StNewsContent,
  StNewsDragHandle,
  StNewsReorderItem,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/style';

export type News = {
  id: number;
  title: string;
};

type NewsItemProps = {
  news: News;
  onEdit?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
};

const NewsItem = ({
  news,
  onEdit,
  onDelete,
  disabled = false,
}: NewsItemProps) => {
  const dragControls = useDragControls();

  return (
    <StNewsReorderItem
      value={news}
      drag={disabled ? false : 'y'}
      dragControls={dragControls}
      dragListener={false}
      whileDrag={{ opacity: 0.5 }}>
      <StNewsDragHandle
        type="button"
        disabled={disabled}
        aria-label={`${news.title} 순서 변경`}
        onPointerDown={(event) => {
          if (!disabled) {
            dragControls.start(event);
          }
        }}>
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
    </StNewsReorderItem>
  );
};

export default NewsItem;

import { IconTrash } from '@sopt-makers/icons';

import { StNewsItem } from '@/components/org/OrgAdmin/HomeSection/style';

type NewsItemProps = {
  title: string;
  onDelete?: () => void;
};

const NewsItem = ({ title, onDelete }: NewsItemProps) => {
  return (
    <StNewsItem>
      {title}
      <IconTrash
        role="button"
        aria-label={`${title} 삭제 버튼`}
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onDelete?.()}
        onClick={onDelete}
        color="white"
      />
    </StNewsItem>
  );
};

export default NewsItem;

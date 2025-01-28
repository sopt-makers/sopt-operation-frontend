import { IconEdit, IconTrash } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';
import { CSSProperties } from 'react';

import {
  listItemCss,
  progressColorVariant,
  progressCss,
  tagColorVariant,
  tagCss,
} from './style';

export interface ListItemProp extends BannerList {}

const ProgressTextMap: Record<BannerList['status'], string> = {
  reserved: '진행 예정',
  in_progress: '진행 중',
  done: '진행 종료',
};

const TagTextMap: Record<BannerList['content_type'], string> = {
  product: '상품',
  birthday: '생일',
  sponsor: '스폰서',
  event: '이벤트',
  etc: '기타',
};

const ListItem = (props: ListItemProp) => {
  const {
    status,
    location,
    content_type,
    title,
    publisher,
    start_date,
    end_date,
  } = props;

  const progressStyle = { ...progressColorVariant[status] } as CSSProperties;
  const tagStyle = { ...tagColorVariant[content_type] } as CSSProperties;

  return (
    <li css={listItemCss}>
      <div
        aria-describedby="진행 상태(임시)"
        style={progressStyle}
        css={progressCss}>
        {ProgressTextMap[status]}
      </div>
      <div>
        <Tag size="md" shape="pill" css={tagCss}>
          {TagTextMap[content_type]}
        </Tag>
        <Tag size="md" shape="pill">
          {TagTextMap[content_type]}
        </Tag>
        <span>{TagTextMap[content_type]}</span>
        <span>{start_date}</span>
        <span>{end_date}</span>
      </div>
      <div>
        <IconEdit />
        <IconTrash />
      </div>
    </li>
  );
};

export default ListItem;

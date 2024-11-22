import { IconEdit, IconTrash } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';
import { CSSProperties } from 'react';

import { Progress, TagType } from '../types';
import {
  listItemCss,
  progressColorVariant,
  progressCss,
  tagColorVariant,
  tagCss,
} from './style';

export interface ListItemProp {
  progress: Progress;
  tag: TagType;
}

const ProgressTextMap: Record<Progress, string> = {
  reserved: '진행 예정',
  finished: '진행 종료',
  'in-progress': '진행 중',
};

const TagTextMap: Record<TagType, string> = {
  'pg-community': '플그 커뮤니티',
  'cr-main': '크루 메인',
  'cr-feed': '크루 피드',
  org: '오거나이저',
};

const ListItem = (props: ListItemProp) => {
  const { progress, tag } = props;

  const progressStyle = { ...progressColorVariant[progress] } as CSSProperties;
  const tagStyle = { ...tagColorVariant[tag] } as CSSProperties;

  return (
    <li css={listItemCss}>
      <div
        aria-describedby="진행 상태(임시)"
        style={progressStyle}
        css={progressCss}>
        {ProgressTextMap[progress]}
      </div>
      <div>
        <Tag size="md" shape="pill" css={tagCss}>
          {TagTextMap[tag]}
        </Tag>
        <Tag size="md" shape="pill">
          {TagTextMap[tag]}
        </Tag>
        <span>{TagTextMap[tag]}</span>
        <span>2024.11.02</span>
        <span>2024.11.02</span>
      </div>
      <div>
        <IconEdit />
        <IconTrash />
      </div>
    </li>
  );
};

export default ListItem;

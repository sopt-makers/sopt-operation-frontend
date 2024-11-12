import { colors } from '@sopt-makers/colors';
import { IconEdit, IconTrash } from '@sopt-makers/icons';
import { Tag } from '@sopt-makers/ui';

import { listItemCss } from './style';

type TagType = 'pg-community' | 'cr-main' | 'cr-feed' | 'org';

const TagColorMap: Record<TagType, string> = {
  'pg-community': '#58CF0580',
  'cr-main': '#00AEFF80',
  'cr-feed': '#FA73E380',
  org: colors.orangeAlpha500,
};

const ListItem = () => {
  return (
    <li css={listItemCss}>
      <div aria-describedby="진행 상태(임시)">진행 예정</div>
      <div>
        <Tag size="md" shape="pill" css={{ backgroundColor: '#58CF0580' }}>
          플그 커뮤니티
        </Tag>
        <Tag size="md" shape="pill">
          플그 커뮤니티
        </Tag>
        <span>마케팅 오거나이저</span>
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

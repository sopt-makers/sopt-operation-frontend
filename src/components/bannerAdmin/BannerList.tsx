import { Tab } from '@sopt-makers/ui';
import { useState } from 'react';

import ListItem from './components/ListItem';
import { bannerListCss, bannerListHeaderCss } from './style';
import { TabOption } from './types';

const BannerList = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>('all');

  return (
    <>
      <Tab
        style="primary"
        size="lg"
        tabItems={['전체', '진행 예정', '진행 중', '진행 종료']}
        onChange={(value) => setSelectedTab(value as TabOption)}
      />
      <div css={bannerListHeaderCss}>ddd</div>
      <ul css={bannerListCss}>
        <ListItem progress="reserved" tag="pg-community" />
        <ListItem progress="in-progress" tag="cr-main" />
        <ListItem progress="finished" tag="cr-feed" />
      </ul>
    </>
  );
};

export default BannerList;

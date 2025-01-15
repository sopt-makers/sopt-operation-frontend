import { Button, Tab } from '@sopt-makers/ui';
import { useState } from 'react';

import CreateBannerModal from './components/BannerModal/BannerModal';
import ListItem from './components/ListItem/ListItem';
import { bannerListCss, bannerListHeaderCss } from './style';
import { TabOption } from './types';

const BannerList = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>('all');
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Tab
        style="primary"
        size="lg"
        tabItems={['전체', '진행 예정', '진행 중', '진행 종료']}
        onChange={(value) => setSelectedTab(value as TabOption)}
      />
      <div css={bannerListHeaderCss}>ddd</div>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        모달 열기
      </Button>
      <ul css={bannerListCss}>
        <ListItem progress="reserved" tag="pg-community" />
        <ListItem progress="in-progress" tag="cr-main" />
        <ListItem progress="finished" tag="cr-feed" />
      </ul>
      <CreateBannerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default BannerList;

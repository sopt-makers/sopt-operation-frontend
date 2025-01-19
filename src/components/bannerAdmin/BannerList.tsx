import { Button, Tab } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import { getBannerList } from '@/services/api/banner';
import { useGetBannerList } from '@/services/api/banner/query';

import CreateBannerModal from './components/BannerModal/BannerModal';
import ListItem from './components/ListItem/ListItem';
import { bannerListCss, bannerListHeaderCss } from './style';

const BannerList = () => {
  const [selectedTab, setSelectedTab] = useState<TabOption>('all');
  const [isOpen, setIsOpen] = useState(false);

  const { data: bannerList } = useGetBannerList(
    selectedTab as BannerList['status'],
    'status',
  );

  console.log(bannerList);

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
        {bannerList?.banners.map((banner) => (
          <ListItem key={banner.id} {...banner} />
        ))}
      </ul>
      <CreateBannerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default BannerList;

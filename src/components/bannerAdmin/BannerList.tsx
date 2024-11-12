import { Tab } from '@sopt-makers/ui';

import ListItem from './components/ListItem';
import { bannerListCss } from './style';

const BannerList = () => {
  return (
    <>
      <Tab
        style="primary"
        size="lg"
        tabItems={['전체', '진행 예정', '진행 중', '진행 종료']}
        onChange={() => console.log()}
      />
      <ul css={bannerListCss}>
        <ListItem />
      </ul>
    </>
  );
};

export default BannerList;

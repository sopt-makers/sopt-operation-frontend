import BannerList from '@/components/bannerAdmin/BannerList';
import PageWrapper from '@/components/common/PageWrapper/PageWrapper';

const BannerAdminPage = () => {
  return (
    <PageWrapper title={'광고 배너 관리'}>
      <BannerList />
    </PageWrapper>
  );
};

export default BannerAdminPage;

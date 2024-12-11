import { ToastProvider } from '@sopt-makers/ui';

import NewsSection from '@/components/org/OrgAdmin/HomeSection/NewsSection';
import PartIntroSection from '@/components/org/OrgAdmin/HomeSection/PartIntroSection';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StContainer,
  StWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';

const HomeSection = () => {
  const { data } = useAdminInfoQuery();

  return (
    <StContainer>
      <ToastProvider>
        <StWrapper>
          <PartIntroSection />
        </StWrapper>
        <NewsSection latestNews={data?.latestNews} />
      </ToastProvider>
    </StContainer>
  );
};

export default HomeSection;

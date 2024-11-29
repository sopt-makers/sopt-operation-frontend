import ButtonSection from '@/components/org/OrgAdmin/HomeSection/ButtonSection';
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
      <StWrapper>
        <ButtonSection mainButton={data?.mainButton} />
        <PartIntroSection />
      </StWrapper>
      <NewsSection latestNews={data?.latestNews} />
    </StContainer>
  );
};

export default HomeSection;

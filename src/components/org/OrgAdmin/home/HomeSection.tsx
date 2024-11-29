import ButtonSection from '@/components/org/OrgAdmin/home/ButtonSection';
import NewsSection from '@/components/org/OrgAdmin/home/NewsSection';
import PartIntroSection from '@/components/org/OrgAdmin/home/PartIntroSection';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/home/queries';
import { StContainer, StWrapper } from '@/components/org/OrgAdmin/home/style';

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

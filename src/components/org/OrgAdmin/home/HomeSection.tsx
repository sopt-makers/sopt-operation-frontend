import ButtonSection from '@/components/org/OrgAdmin/home/ButtonSection';
import NewsSection from '@/components/org/OrgAdmin/home/NewsSection';
import PartIntroSection from '@/components/org/OrgAdmin/home/PartIntroSection';
import { StContainer, StWrapper } from '@/components/org/OrgAdmin/home/style';

const HomeSection = () => {
  return (
    <StContainer>
      <StWrapper>
        <ButtonSection />
        <PartIntroSection />
      </StWrapper>
      <NewsSection />
    </StContainer>
  );
};

export default HomeSection;

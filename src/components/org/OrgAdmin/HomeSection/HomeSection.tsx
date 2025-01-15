import { ToastProvider } from '@sopt-makers/ui';

import NewsSection from '@/components/org/OrgAdmin/HomeSection/NewsSection';
import PartIntroSection from '@/components/org/OrgAdmin/HomeSection/PartIntroSection';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StContainer,
  StWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { PART_KO } from '@/utils/org';

type HomeSectionProps = {
  selectedIntroPart: PART_KO;
  onChangeIntroPart: (part: PART_KO) => void;
};

const HomeSection = ({
  selectedIntroPart,
  onChangeIntroPart,
}: HomeSectionProps) => {
  const { data } = useAdminInfoQuery();

  return (
    <StContainer>
      <ToastProvider>
        <StWrapper>
          <PartIntroSection
            selectedPart={selectedIntroPart}
            onChangePart={onChangeIntroPart}
          />
        </StWrapper>
        <NewsSection latestNews={data?.latestNews} />
      </ToastProvider>
    </StContainer>
  );
};

export default HomeSection;

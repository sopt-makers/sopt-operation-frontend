import BrandingColor from './BrandingColor';
import GenerationInformation from './GenerationInformation';
import RecruitSchedule from './RecruitSchedule';
import { StContainer } from './style';

const CommonSection = () => {
  return (
    <StContainer>
      <GenerationInformation />
      <RecruitSchedule />
      <BrandingColor />
    </StContainer>
  );
};

export default CommonSection;

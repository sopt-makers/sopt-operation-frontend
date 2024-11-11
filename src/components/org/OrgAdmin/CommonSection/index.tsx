import { StContainer } from '../style';
import BrandingColor from './BrandingColor';
import GenerationInformation from './GenerationInformation';
import RecruitSchedule from './RecruitSchedule';

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

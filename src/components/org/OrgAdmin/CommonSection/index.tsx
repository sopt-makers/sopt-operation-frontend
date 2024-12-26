import { StContainer } from '../style';
import type { Group } from '../types';
import BrandingColor from './BrandingColor';
import GenerationInformation from './GenerationInformation';
import RecruitSchedule from './RecruitSchedule';

interface CommonSectionProps {
  group: Group;
  onChangeGroup: (group: Group) => void;
}

const CommonSection = ({ group, onChangeGroup }: CommonSectionProps) => {
  return (
    <StContainer>
      <GenerationInformation />
      <RecruitSchedule group={group} onChangeGroup={onChangeGroup} />
      <BrandingColor />
    </StContainer>
  );
};

export default CommonSection;

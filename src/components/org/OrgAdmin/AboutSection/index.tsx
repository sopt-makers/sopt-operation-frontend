import { EXEC_TYPE, PART_KO } from '@/utils/org';

import Curriculum from '../RecruitSection/_components/Curriculum';
import CoreValue from './CoreValue';
import Executives from './Executives';
import HeaderBanner from './HeaderBanner';
import { StContainer } from './style';

interface AboutSectionProps {
  selectedPart: PART_KO;
  onChangeSelectedPart: (part: PART_KO) => void;
  selectedExec: EXEC_TYPE;
  onChangeSelectedExec: (member: EXEC_TYPE) => void;
}

const AboutSection = ({
  selectedPart,
  onChangeSelectedPart,
  selectedExec,
  onChangeSelectedExec,
}: AboutSectionProps) => {
  return (
    <StContainer>
      <HeaderBanner />
      <CoreValue />
      <Curriculum
        selectedPart={selectedPart}
        onChangeSelectedPart={onChangeSelectedPart}
      />
      <Executives
        selectedExec={selectedExec}
        onChangeSelectedExec={onChangeSelectedExec}
      />
    </StContainer>
  );
};

export default AboutSection;

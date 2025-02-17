import { EXEC_TYPE, PART_KO } from '@/utils/org';

import CoreValue from './CoreValue';
import Curriculum from './Curriculum';
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

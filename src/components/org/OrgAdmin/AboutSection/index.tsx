import { EXEC_TYPE } from '@/utils/org';

import Curriculum from '../RecruitSection/_components/Curriculum';
import CoreValue from './CoreValue';
import Executives from './Executives';
import HeaderBanner from './HeaderBanner';
import Schedule from './Schedule';
import { StContainer } from './style';

interface AboutSectionProps {
  selectedExec: EXEC_TYPE;
  onChangeSelectedExec: (member: EXEC_TYPE) => void;
}

const AboutSection = ({
  selectedExec,
  onChangeSelectedExec,
}: AboutSectionProps) => {
  return (
    <StContainer>
      <HeaderBanner />
      <CoreValue />
      {/* Curriculum은 추후 제거 예정이라 잠시 비워두고, 현재는 전체 일정으로 대체한다. */}
      <Schedule />
      <Executives
        selectedExec={selectedExec}
        onChangeSelectedExec={onChangeSelectedExec}
      />
    </StContainer>
  );
};

export default AboutSection;

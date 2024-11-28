import { PART_KO } from '@/utils/org';

import { StContainer } from '../style';
import Fna from './Fna';
import Header from './Header';
import PartCurriculum from './PartCurriculum';

interface RecruitSectionProps {
  curriculumPart: PART_KO;
  onChangeCurriculumPart: (part: PART_KO) => void;
  fnaPart: string;
  onChangeFnaPart: (part: string) => void;
}

const RecruitSection = ({
  curriculumPart,
  onChangeCurriculumPart,
  fnaPart,
  onChangeFnaPart,
}: RecruitSectionProps) => {
  return (
    <StContainer>
      <Header />
      <PartCurriculum
        curriculumPart={curriculumPart}
        onChangeCurriculumPart={onChangeCurriculumPart}
      />
      <Fna fnaPart={fnaPart} onChangeFnaPart={onChangeFnaPart} />
    </StContainer>
  );
};

export default RecruitSection;

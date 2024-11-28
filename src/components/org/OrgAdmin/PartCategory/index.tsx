import { Chip } from '@sopt-makers/ui';

import { PART_KO, PART_LIST } from '@/utils/org';

import { StPartCategoryWrapper } from './style';

interface PartCategoryProps {
  curriculumPart: PART_KO;
  onSetSelectedPart: (part: PART_KO) => void;
}
const PartCategory = ({
  curriculumPart,
  onSetSelectedPart,
}: PartCategoryProps) => {
  return (
    <StPartCategoryWrapper>
      {PART_LIST.map((part) => (
        <Chip
          key={`${part}-${part}`}
          onClick={() => onSetSelectedPart(part)}
          active={curriculumPart === part}>
          {part}
        </Chip>
      ))}
    </StPartCategoryWrapper>
  );
};

export default PartCategory;

import { Chip } from '@sopt-makers/ui';

import { PART_KO, PART_LIST } from '@/utils/org';

import { StPartCategoryWrapper } from './style';

interface PartCategoryProps {
  selectedPart: PART_KO;
  onSetSelectedPart: (part: PART_KO) => void;
}
const PartCategory = ({
  selectedPart,
  onSetSelectedPart,
}: PartCategoryProps) => {
  return (
    <StPartCategoryWrapper>
      {PART_LIST.map((part) => (
        <Chip
          key={`${part}-${part}`}
          onClick={() => onSetSelectedPart(part)}
          active={selectedPart === part}>
          {part}
        </Chip>
      ))}
    </StPartCategoryWrapper>
  );
};

export default PartCategory;

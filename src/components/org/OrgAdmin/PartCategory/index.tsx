import { Chip } from '@sopt-makers/ui';

import { PART_LIST } from '@/utils/org';

import { StPartCategoryWrapper } from './style';

interface PartCategoryProps {
  selectedPart: string;
  onSetSelectedPart: (part: string) => void;
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

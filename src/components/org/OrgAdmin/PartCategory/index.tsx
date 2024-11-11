import { Chip } from '@sopt-makers/ui';

import { PART_LIST } from '@/utils/org';

import { StPartCategoryWrapper } from './style';

const PartCategory = () => {
  return (
    <StPartCategoryWrapper>
      {PART_LIST.map((part) => (
        <Chip key={`${part}-${part}`}>{part}</Chip>
      ))}
    </StPartCategoryWrapper>
  );
};

export default PartCategory;

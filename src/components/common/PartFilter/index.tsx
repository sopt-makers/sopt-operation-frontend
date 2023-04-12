import { partList, partTranslator } from '@/utils/translator';

import { FilterButton, StPartFilter } from './style';

interface Props {
  selected: PART;
  onChangePart: (part: PART) => void;
}

function PartFilter(props: Props) {
  const { selected, onChangePart } = props;

  return (
    <StPartFilter>
      {partList.map((part) => (
        <FilterButton
          key={part}
          selected={selected === part}
          onClick={() => onChangePart(part)}>
          {partTranslator[part]}
        </FilterButton>
      ))}
    </StPartFilter>
  );
}

export default PartFilter;

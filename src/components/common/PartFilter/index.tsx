import FilterButton from '@/components/common/FilterButton';
import {
  allPartTranslator,
  partList,
  partTranslator,
} from '@/utils/translator';

interface Props {
  selected: PART;
  onChangePart: (part: PART) => void;
  isAllPart?: boolean;
}

function PartFilter(props: Props) {
  const { selected, onChangePart, isAllPart = false } = props;

  return (
    <FilterButton<PART>
      list={partList}
      selected={selected}
      onChange={onChangePart}
      translator={isAllPart ? allPartTranslator : partTranslator}
    />
  );
}

export default PartFilter;

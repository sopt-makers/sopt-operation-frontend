import FilterButton from '@/components/common/FilterButton';
import { partList, partTranslator } from '@/utils/translator';

interface Props {
  selected: PART;
  onChangePart: (part: PART) => void;
}

function PartFilter(props: Props) {
  const { selected, onChangePart } = props;

  return (
    <FilterButton<PART>
      list={partList}
      selected={selected}
      onChange={onChangePart}
      translator={partTranslator}
    />
  );
}

export default PartFilter;

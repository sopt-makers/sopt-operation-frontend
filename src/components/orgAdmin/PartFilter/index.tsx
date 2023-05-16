import FilterButton from '@/components/common/FilterButton';
import { partTranslator } from '@/utils/translator';

export type PartWithoutAll = Exclude<PART, 'ALL'>;

interface Props {
  selected: PartWithoutAll;
  onChangePart: (part: PartWithoutAll) => void;
}

const partList: PartWithoutAll[] = [
  'PLAN',
  'DESIGN',
  'SERVER',
  'IOS',
  'ANDROID',
  'WEB',
];

function PartFilter(props: Props) {
  const { selected, onChangePart } = props;

  return (
    <FilterButton<PartWithoutAll>
      list={partList}
      selected={selected}
      onChange={onChangePart}
      translator={partTranslator}
    />
  );
}

export default PartFilter;

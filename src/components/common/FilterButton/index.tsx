import {
  FilterButtonItem,
  FilterWrapper,
  StUnderline,
} from '@/components/common/FilterButton/style';

interface Props<T extends string | number> {
  list: T[];
  translator?: Record<T, string>;
  onChange: (item: T) => void;
  selected: T;
}

function FilterButton<T extends string | number>(props: Props<T>) {
  const { list, translator, selected, onChange } = props;

  return (
    <>
      <FilterWrapper>
        {list.map((item: T) => (
          <FilterButtonItem
            key={item}
            selected={selected === item}
            onClick={() => onChange(item)}>
            {translator ? translator[item] : item}
          </FilterButtonItem>
        ))}
      </FilterWrapper>
      <StUnderline />
    </>
  );
}

export default FilterButton;

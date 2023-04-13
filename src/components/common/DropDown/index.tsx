import { DropdownWrapper } from './style';

export interface Props {
  type: 'select' | 'times';
  list: string[];
  onItemSelected?: (value: string) => void;
}

function DropDown(props: Props) {
  const { type, list, onItemSelected } = props;

  function handleClick(item: string) {
    if (onItemSelected) {
      onItemSelected(item);
    }
  }

  return (
    <DropdownWrapper type={type}>
      <div>
        {list.map((list) => (
          <p key={list} onClick={() => handleClick(list)}>
            {list}
          </p>
        ))}
      </div>
    </DropdownWrapper>
  );
}

export default DropDown;

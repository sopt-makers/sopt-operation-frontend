import { DropdownWrapper } from './style';

interface Props {
  list: string[];
  onItemSelected?: (value: string) => void;
}

function DropDown(props: Props) {
  const { list, onItemSelected } = props;

  function handleClick(item: string) {
    if (onItemSelected) {
      onItemSelected(item);
    }
  }

  return (
    <DropdownWrapper>
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

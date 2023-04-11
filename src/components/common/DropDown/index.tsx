import { DropdownWrapper } from './style';

interface Props {
  list: string[] | number[];
}

function DropDown(props: Props) {
  const { list } = props;
  return (
    <DropdownWrapper>
      <div>
        {list.map((list) => (
          <p key={list}>{list}</p>
        ))}
      </div>
    </DropdownWrapper>
  );
}

export default DropDown;

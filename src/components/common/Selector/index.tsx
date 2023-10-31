import { IcNewDropdown } from '@/assets/icons';

import { StSelectorWrapper } from './style';

interface Props {
  content: string;
  onClick: () => void;
  selectedValue?: string;
}

function Selector(props: Props) {
  const { content, onClick, selectedValue } = props;

  return (
    <StSelectorWrapper onClick={onClick} selectedValue={selectedValue}>
      {content}
      <IcNewDropdown />
    </StSelectorWrapper>
  );
}

export default Selector;

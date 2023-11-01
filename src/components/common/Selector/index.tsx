import { IcNewDropdown } from '@/assets/icons';

import { StSelectorWrapper } from './style';

interface Props {
  content: string | null;
  onClick: () => void;
  isDisabledValue?: boolean;
}

function Selector(props: Props) {
  const { content, onClick, isDisabledValue } = props;

  return (
    <StSelectorWrapper onClick={onClick} isDisabledValue={isDisabledValue}>
      {content}
      <IcNewDropdown />
    </StSelectorWrapper>
  );
}

export default Selector;

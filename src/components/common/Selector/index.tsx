import { IcNewDropdown } from '@/assets/icons';

import { StSelectorWrapper } from './style';

interface Props {
  content: string | null;
  onClick?: () => void;
  isDisabledValue?: boolean;
  readOnly?: boolean;
}

function Selector(props: Props) {
  const { content, onClick, isDisabledValue = false, readOnly = false } = props;

  return (
    <StSelectorWrapper
      onClick={onClick}
      isDisabledValue={isDisabledValue}
      readOnly={readOnly}>
      {content}
      <IcNewDropdown />
    </StSelectorWrapper>
  );
}

export default Selector;

import { StTitle, StWrapper } from '../style';
import CoreValueItem from './CoreValueItem';

const CORE_VALUE_INDICES = [1, 2, 3] as const;

interface CoreValueProps {
  isEditable?: boolean;
}

const CoreValue = ({ isEditable = true }: CoreValueProps) => {
  return (
    <StWrapper>
      <StTitle>핵심 가치</StTitle>
      {CORE_VALUE_INDICES.map((index) => (
        <CoreValueItem key={index} index={index} isEditable={isEditable} />
      ))}
    </StWrapper>
  );
};

export default CoreValue;

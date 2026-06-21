import { StTitle, StWrapper } from '../style';
import CoreValueItem from './CoreValueItem';

const CORE_VALUE_INDICES = [1, 2, 3] as const;

const CoreValue = () => {
  return (
    <StWrapper>
      <StTitle>핵심 가치</StTitle>
      {CORE_VALUE_INDICES.map((index) => (
        <CoreValueItem key={index} index={index} />
      ))}
    </StWrapper>
  );
};

export default CoreValue;

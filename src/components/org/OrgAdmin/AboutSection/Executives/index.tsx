import { Chip } from '@sopt-makers/ui';

import { EXEC_TYPE, PART_LIST, 임원진_LIST } from '@/utils/org';

import { StTitle, StWrapper } from '../style';
import ExecInfo from './ExecInfo';
import { StChipLabel, StChipLine, StChipWrapper } from './style';

interface ExecutivesProps {
  selectedExec: EXEC_TYPE;
  onChangeSelectedExec: (member: EXEC_TYPE) => void;
}

const Executives = ({
  selectedExec,
  onChangeSelectedExec,
}: ExecutivesProps) => {
  const handleSetSelectedExec = (value: EXEC_TYPE) => {
    onChangeSelectedExec(value);
  };

  return (
    <StWrapper>
      <StTitle>임원진</StTitle>
      <StChipWrapper>
        <StChipLine>
          <StChipLabel>임원진</StChipLabel>
          {임원진_LIST.map((role) => (
            <Chip
              key={role}
              onClick={() => handleSetSelectedExec(role)}
              active={selectedExec === role}>
              {role}
            </Chip>
          ))}
        </StChipLine>
        <StChipLine>
          <StChipLabel>파트장</StChipLabel>
          {PART_LIST.map((part) => (
            <Chip
              key={part}
              onClick={() => handleSetSelectedExec(part)}
              active={selectedExec === part}>{`${part} 파트장`}</Chip>
          ))}
        </StChipLine>
      </StChipWrapper>
      <ExecInfo key={selectedExec} selectedExec={selectedExec} />
    </StWrapper>
  );
};

export default Executives;

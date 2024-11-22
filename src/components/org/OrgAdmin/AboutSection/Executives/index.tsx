import { Chip } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { PART_LIST, 임원진_LIST } from '@/utils/org';

import { StTitle, StWrapper } from '../style';
import ExecInfo from './ExecInfo';
import { StChipLabel, StChipLine, StChipWrapper } from './style';

const Executives = () => {
  const [selectedExec, setSelectedExec] = useState('회장');
  const method = useFormContext();

  const handleSetSelectedExec = (value: string) => {
    setSelectedExec(value);
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
      <ExecInfo
        key={selectedExec}
        method={method}
        selectedExec={selectedExec}
      />
    </StWrapper>
  );
};

export default Executives;

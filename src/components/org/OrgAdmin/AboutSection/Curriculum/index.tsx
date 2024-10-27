import { Chip } from '@sopt-makers/ui';

import { PART_LIST } from '@/utils/org';

import { StInput, StTitle, StWrapper } from '../style';
import {
  StChipWrapper,
  StContentWrapper,
  StItem,
  StList,
  StWeek,
} from './style';

const Curriculum = () => {
  const CURRICULUM = ['', '2주차', '3주차', '4주차', '', '', '', ''];

  return (
    <StWrapper>
      <StTitle>파트별 커리큘럼</StTitle>
      <StContentWrapper>
        <StChipWrapper>
          {PART_LIST.map((part) => (
            <Chip key={part}>{part}</Chip>
          ))}
        </StChipWrapper>
        <StList>
          {CURRICULUM.map((curr, idx) => (
            <StItem key={curr}>
              <StWeek htmlFor={`week${idx + 1}`}>0{idx + 1}</StWeek>
              <StInput
                id={`week${idx}`}
                value={curr}
                style={{ width: '553px' }}
                placeholder={`${idx + 1}주차 커리큘럼을 작성해주세요.`}
              />
            </StItem>
          ))}
        </StList>
      </StContentWrapper>
    </StWrapper>
  );
};

export default Curriculum;

import { Chip } from '@sopt-makers/ui';

import { StInput, StTitle, StWrapper } from '../style';
import {
  StChipWrapper,
  StContentWrapper,
  StItem,
  StList,
  StWeek,
} from './style';

const Curriculum = () => {
  // utils/session/partList와 순서 달라서 분리
  const PART_LIST = ['기획', '디자인', '안드로이드', 'iOS', '웹', '서버'];
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
              <StWeek htmlFor={`week${idx + 1}`}>0{idx}</StWeek>
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

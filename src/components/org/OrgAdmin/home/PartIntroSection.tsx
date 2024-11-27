import { IconInfoCircle } from '@sopt-makers/icons';
import { Chip, TextArea } from '@sopt-makers/ui';

import sampleImg from '@/assets/img/partIntroduceSample.png';
import SampleView from '@/components/org/OrgAdmin/home/SampleView';
import {
  StChipsContainer,
  StSecondSectionContainer,
  StTextAreaContainer,
  StTitleWithIcon,
} from '@/components/org/OrgAdmin/home/style';

const PartIntroSection = () => {
  return (
    <StSecondSectionContainer>
      <StTextAreaContainer>
        <StTitleWithIcon>
          파트별 소개
          <IconInfoCircle />
        </StTitleWithIcon>

        <StChipsContainer>
          <Chip>기획</Chip>
          <Chip>디자인</Chip>
          <Chip>안드로이드</Chip>
          <Chip>IOS</Chip>
          <Chip>웹</Chip>
          <Chip>서버</Chip>
        </StChipsContainer>

        <TextArea
          value=""
          fixedHeight={230}
          maxHeight={230}
          onSubmit={() => {}}
          placeholder={
            '파트별 설명을 작성해주세요. \nex.\n 린스타트업에 기초해 고객 문제정의 - 고객 발굴 - 검증 과정을 거쳐 비즈니스 전략과 핵심지표 설계까지 고객 관점 프로덕트를 만들고 운영하기 위한 모든 과정을 다룹니다.'
          }
        />
      </StTextAreaContainer>
      <SampleView
        src={sampleImg}
        category="파트별 소개"
        title="메인 홈 'Part' 속 파트별 소개에요"
        description="파트의 간략한 소개를 작성해주세요."
      />
    </StSecondSectionContainer>
  );
};

export default PartIntroSection;

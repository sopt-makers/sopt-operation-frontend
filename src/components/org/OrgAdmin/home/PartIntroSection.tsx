import { IconInfoCircle } from '@sopt-makers/icons';
import { Chip, TextArea } from '@sopt-makers/ui';
import { ChangeEvent, useState } from 'react';

import sampleImg from '@/assets/img/partIntroduceSample.png';
import SampleView from '@/components/org/OrgAdmin/home/SampleView';
import {
  StChipsContainer,
  StSecondSectionContainer,
  StTextAreaContainer,
  StTitleWithIcon,
} from '@/components/org/OrgAdmin/home/style';

type Part = 'pm' | 'de' | 'an' | 'io' | 'we' | 'sv';

type TextFieldofParts = {
  [key in Part]: string;
};

const PartIntroSection = () => {
  const [selectedChip, setSelectedChip] = useState<Part>('pm');
  const [values, setValues] = useState<TextFieldofParts>({
    pm: '',
    de: '',
    an: '',
    io: '',
    we: '',
    sv: '',
  });

  const handleSelectChip = (id: Part) => {
    setSelectedChip(id);
  };

  const getActiveStatus = (id: Part) => id === selectedChip;

  const handleChangeValues = (
    id: Part,
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({
      ...prev,
      [id]: e.target.value,
    }));
  };

  return (
    <StSecondSectionContainer>
      <StTextAreaContainer>
        <StTitleWithIcon>
          파트별 소개
          <IconInfoCircle />
        </StTitleWithIcon>

        <StChipsContainer>
          <Chip
            active={getActiveStatus('pm')}
            onClick={() => handleSelectChip('pm')}>
            기획
          </Chip>
          <Chip
            active={getActiveStatus('de')}
            onClick={() => handleSelectChip('de')}>
            디자인
          </Chip>
          <Chip
            active={getActiveStatus('an')}
            onClick={() => handleSelectChip('an')}>
            안드로이드
          </Chip>
          <Chip
            active={getActiveStatus('io')}
            onClick={() => handleSelectChip('io')}>
            IOS
          </Chip>
          <Chip
            active={getActiveStatus('we')}
            onClick={() => handleSelectChip('we')}>
            웹
          </Chip>
          <Chip
            active={getActiveStatus('sv')}
            onClick={() => handleSelectChip('sv')}>
            서버
          </Chip>
        </StChipsContainer>

        <TextArea
          value={values[selectedChip]}
          fixedHeight={230}
          maxHeight={230}
          onChange={(e) => handleChangeValues(selectedChip, e)}
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

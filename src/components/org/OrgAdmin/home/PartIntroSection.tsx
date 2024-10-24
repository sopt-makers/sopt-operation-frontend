import { colors } from '@sopt-makers/colors';
import { IconInfoCircle } from '@sopt-makers/icons';
import { Chip, TextArea } from '@sopt-makers/ui';
import Image from 'next/image';

import { IcModalClose } from '@/assets/icons';
import sampleImg from '@/assets/img/partIntroduceSample.png';
import {
  StChipsContainer,
  StDescription,
  StDescription2,
  StImgTitle,
  StImgWrapper,
  StImgWrapperTitle,
  StSecondSectionContainer,
  StTextAreaContainer,
  StTitle,
} from '@/components/org/OrgAdmin/home/style';

const PartIntroSection = () => {
  return (
    <StSecondSectionContainer>
      <StTextAreaContainer>
        <StTitle>파트별 소개</StTitle>

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
      <StImgWrapper>
        <StImgWrapperTitle>
          <StImgTitle>
            <IconInfoCircle color={colors.white} />
            파트별 소개
          </StImgTitle>
          <IcModalClose />
        </StImgWrapperTitle>
        <StDescription>메인 홈 &quotPart&quot 속 파트별 소개에요</StDescription>
        <StDescription2>파트의 간략한 소개를 작성해주세요.</StDescription2>
        <Image src={sampleImg} alt="파트별 소개 이미지" />
      </StImgWrapper>
    </StSecondSectionContainer>
  );
};

export default PartIntroSection;

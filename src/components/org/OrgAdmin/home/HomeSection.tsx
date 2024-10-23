import { IconPlus, IconTrash } from '@sopt-makers/icons';
import { Button, Chip, TextArea, TextField } from '@sopt-makers/ui';
import Image from 'next/image';
import { useState } from 'react';

import { IcModalClose } from '@/assets/icons';
import sampleImg from '@/assets/img/partIntroduceSample.png';
import {
  StButtonFormContainer,
  StChipsContainer,
  StContainer,
  StFirstSectionContainer,
  StForm,
  StNewsHeader,
  StNewsHeaderText,
  StNewsItem,
  StNewsList,
  StPartIntroDescription,
  StPartIntroDescription2,
  StPartIntroImgWrapper,
  StPartIntroImgWrapperTitle,
  StSecondSectionContainer,
  StTextAreaContainer,
  StTitle,
} from '@/components/org/OrgAdmin/home/style';

type ButtonInputValue = {
  label: string;
  keyColor: string;
  subColor: string;
};

type PartIntroduceInputValue = {
  pm: string;
  design: string;
  and: string;
  ios: string;
  web: string;
  server: string;
};

const HomeSection = () => {
  const [btnValues, setBtnValues] = useState<ButtonInputValue>();
  const [partValues, setPartValues] = useState<PartIntroduceInputValue>();

  const handleInputChange = () => {};

  return (
    <StContainer>
      <StForm>
        <StFirstSectionContainer>
          <StButtonFormContainer>
            <StTitle>메인 버튼</StTitle>

            <TextField
              labelText="문구"
              placeholder="ex. 00기 YB 지원하기"
              value={''}
            />
            <TextField
              labelText="키 컬러"
              descriptionText="호버 시, 하이라이트는 키컬러로 보여요."
              placeholder="ex. ffffff"
              value={''}
            />
            <TextField
              labelText="서브 컬러"
              descriptionText="호버하지 않았을 때, 버튼은 서브 컬러로 보여요."
              placeholder="ex. ffffff"
              value={''}
            />
          </StButtonFormContainer>
          <div>실시간 버튼</div>
        </StFirstSectionContainer>

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
              maxLength={50}
              fixedHeight={230}
              onSubmit={() => {}}
              placeholder={
                '파트별 설명을 작성해주세요. \nex.\n 린스타트업에 기초해 고객 문제정의 - 고객 발굴 - 검증 과정을 거쳐 비즈니스 전략과 핵심지표 설계까지 고객 관점 프로덕트를 만들고 운영하기 위한 모든 과정을 다룹니다.'
              }
            />
          </StTextAreaContainer>
          <StPartIntroImgWrapper>
            <StPartIntroImgWrapperTitle>
              <StTitle>파트별 소개</StTitle>
              <IcModalClose />
            </StPartIntroImgWrapperTitle>
            <StPartIntroDescription>
              메인 홈 &quotPart&quot 속 파트별 소개에요
            </StPartIntroDescription>
            <StPartIntroDescription2>
              파트의 간략한 소개를 작성해주세요.
            </StPartIntroDescription2>
            <Image src={sampleImg} alt="파트별 소개 이미지" />
          </StPartIntroImgWrapper>
        </StSecondSectionContainer>
      </StForm>
      <div>
        <StNewsHeader>
          <StNewsHeaderText>
            <h2>최신 소식</h2>
            <p>
              메인 홈 ‘솝트의 최신 소식이 궁금하다면!’에서 리스트 위에서부터
              순서대로 홈페이지에 배치돼요.
            </p>
          </StNewsHeaderText>
          <Button css={{ whiteSpace: 'nowrap' }} LeftIcon={IconPlus}>
            추가
          </Button>
        </StNewsHeader>
        <StNewsList>
          <StNewsItem>
            Do SOPT OT{' '}
            <IconTrash
              color="white"
              style={{ width: '2.4rem', height: '2.4rem' }}
            />
          </StNewsItem>
          <StNewsItem>
            SOPT effect : 창업가 초청 토크 세션 <IconTrash color="white" />
          </StNewsItem>
          <StNewsItem>
            [매쉬업엔젤스 X SOPT] Open Office Hours <IconTrash color="white" />
          </StNewsItem>
          <StNewsItem>
            MIND 23 : IT PEOPLE CONFERENCE <IconTrash color="white" />
          </StNewsItem>
          <StNewsItem>
            DO SOPT 1차 행사 <IconTrash color="white" />
          </StNewsItem>
        </StNewsList>
      </div>
    </StContainer>
  );
};

export default HomeSection;

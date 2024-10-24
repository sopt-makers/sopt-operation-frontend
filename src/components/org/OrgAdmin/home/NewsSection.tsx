import { colors } from '@sopt-makers/colors';
import { IconInfoCircle, IconPlus, IconTrash } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import Image from 'next/image';

import { IcModalClose } from '@/assets/icons';
import sampleImg from '@/assets/img/latestNewsSample.png';
import {
  StDescription,
  StDescription2,
  StImgTitle,
  StImgWrapper,
  StImgWrapperTitle,
  StNewsHeader,
  StNewsHeaderText,
  StNewsItem,
  StNewsList,
  StNewsSectionContainer,
} from '@/components/org/OrgAdmin/home/style';

const NewsSection = () => {
  return (
    <StNewsSectionContainer>
      <div>
        <StNewsHeader>
          <StNewsHeaderText>
            <h2>최신 소식</h2>
            <p>
              &apos;최신 소식&apos;은 배포 버튼을 거치지 않아도 바로 저장되니,
              신중하게 작성해주세요!
            </p>
          </StNewsHeaderText>
          <Button css={{ whiteSpace: 'nowrap' }} LeftIcon={IconPlus}>
            추가
          </Button>
        </StNewsHeader>
        <StNewsList>
          <StNewsItem>
            Do SOPT OT
            <IconTrash color="white" />
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
      <StImgWrapper>
        <StImgWrapperTitle>
          <StImgTitle>
            <IconInfoCircle color={colors.white} />
            파트별 소개
          </StImgTitle>
          <IcModalClose />
        </StImgWrapperTitle>
        <StDescription>
          메인 홈 &apos;Part&apos; 속 파트별 소개에요
        </StDescription>
        <StDescription2>파트의 간략한 소개를 작성해주세요.</StDescription2>
        <Image src={sampleImg} alt="파트별 소개 이미지" />
      </StImgWrapper>
    </StNewsSectionContainer>
  );
};

export default NewsSection;

import {
  StNewsHeader,
  StNewsHeaderText,
  StNewsItem,
  StNewsList,
} from '@/components/org/OrgAdmin/home/style';
import { IconPlus, IconTrash } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';

const NewsSection = () => {
  return (
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
  );
};

export default NewsSection;

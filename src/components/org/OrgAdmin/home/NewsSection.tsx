import { colors } from '@sopt-makers/colors';
import { IconInfoCircle, IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import Image from 'next/image';

import { IcModalClose } from '@/assets/icons';
import sampleImg from '@/assets/img/latestNewsSample.png';
import { NEWS } from '@/components/org/OrgAdmin/home/constant';
import {
  ActionModal,
  AddNewsModal,
} from '@/components/org/OrgAdmin/home/Modal';
import NewsItem from '@/components/org/OrgAdmin/home/NewsItem';
import {
  StDescription,
  StDescription2,
  StImgTitle,
  StImgWrapper,
  StImgWrapperTitle,
  StNewsHeader,
  StNewsHeaderText,
  StNewsList,
  StNewsSectionContainer,
} from '@/components/org/OrgAdmin/home/style';
import { useBooleanState } from '@/hooks/useBooleanState';

const NewsSection = () => {
  const {
    flag: isDeleteModalOpen,
    setFalse: closeDeleteModal,
    setTrue: openDeleteModal,
  } = useBooleanState();
  const {
    flag: isAddNewsModalOpen,
    setFalse: closeAddModal,
    setTrue: openAddModal,
  } = useBooleanState();

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
          <Button
            onClick={openAddModal}
            css={{ whiteSpace: 'nowrap' }}
            LeftIcon={IconPlus}>
            추가
          </Button>
        </StNewsHeader>
        <StNewsList>
          {NEWS.map((item) => (
            <NewsItem
              key={item.id}
              title={item.title}
              onDelete={() =>
                openDeleteModal()
              } /** TODO: id 넘겨서 모달 안에서 DELETE request 수행 */
            />
          ))}
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

      <ActionModal
        type="delete"
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onAction={() => {}}
        alertText="삭제하시겠습니까?"
        description="최신 소식은 ‘배포’버튼을 거치지 않고 즉시 배포가 돼요."
      />
      <AddNewsModal isOpen={isAddNewsModalOpen} onCancel={closeAddModal} />
    </StNewsSectionContainer>
  );
};

export default NewsSection;

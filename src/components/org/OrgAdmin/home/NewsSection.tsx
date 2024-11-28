import { IconInfoCircle, IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';

import sampleImg from '@/assets/img/latestNewsSample.png';
import {
  ActionModal,
  AddNewsModal,
} from '@/components/org/OrgAdmin/home/Modal';
import NewsItem from '@/components/org/OrgAdmin/home/NewsItem';
import { useDeleteNewsMutation } from '@/components/org/OrgAdmin/home/queries';
import SampleView from '@/components/org/OrgAdmin/home/SampleView';
import {
  StLeftColumnSection,
  StNewsHeader,
  StNewsHeaderText,
  StNewsList,
  StNewsSectionContainer,
  StTitleWithIcon,
} from '@/components/org/OrgAdmin/home/style';
import { useBooleanState } from '@/hooks/useBooleanState';

type NewsSectionProps = {
  latestNews?: {
    id: number;
    title: string;
  }[];
};

const NewsSection = ({ latestNews }: NewsSectionProps) => {
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

  const [deleteId, setDeleteId] = useState<number>(0);

  const { mutate } = useDeleteNewsMutation();

  const handleDeleteNewsItems = (id: number) => {
    mutate(id, {
      onSuccess: closeDeleteModal,
    });
  };

  return (
    <StNewsSectionContainer>
      <StLeftColumnSection>
        <StNewsHeader>
          <StNewsHeaderText>
            <StTitleWithIcon>
              최신 소식
              <IconInfoCircle />
            </StTitleWithIcon>
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
          {latestNews?.map((item) => (
            <NewsItem
              key={item.id}
              title={item.title}
              onDelete={() => {
                openDeleteModal();
                setDeleteId(item.id);
                console.log(item.id);
              }} /** TODO: id 넘겨서 모달 안에서 DELETE request 수행 */
            />
          ))}
        </StNewsList>
      </StLeftColumnSection>
      <SampleView
        src={sampleImg}
        category="최신 소식"
        title="메인 홈 '솝트의 최신 소식이 궁금하다면!' 입니다."
        description="리스트 순서대로 배치돼요. 행사 포스터와 이름, 링크를 추가해주세요."
      />

      <ActionModal
        key={deleteId}
        variant="delete"
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onAction={() => handleDeleteNewsItems(deleteId)}
        alertText="삭제하시겠습니까?"
        description="최신 소식은 ‘배포’버튼을 거치지 않고 즉시 배포가 돼요."
      />
      <AddNewsModal isOpen={isAddNewsModalOpen} onCancel={closeAddModal} />
    </StNewsSectionContainer>
  );
};

export default NewsSection;

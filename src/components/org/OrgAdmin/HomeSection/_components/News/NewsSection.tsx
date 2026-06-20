import { IconInfoCircle, IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';

import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import { AddNewsModal } from '@/components/org/OrgAdmin/HomeSection/_components/Modal/AddNewsModal';
import { EditNewsModal } from '@/components/org/OrgAdmin/HomeSection/_components/Modal/EditNewsModal';
import NewsItem, {
  type News,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsItem';
import useDragList from '@/components/org/OrgAdmin/HomeSection/_hooks/useDragList';
import { useDeleteNewsMutation } from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StContentWrapper,
  StDescription,
  StIcon,
  StInputLabel,
  StNewsModalWrapper,
  StTitleWithIcon,
  StWrapper,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { useBooleanState } from '@/hooks/useBooleanState';
import EmptyItem from '@/components/org/OrgAdmin/HomeSection/_components/News/EmptyItem';
import { StNewsList, StNewsSectionContainer } from '@/components/org/OrgAdmin/HomeSection/_components/News/style';

type NewsSectionProps = {
  latestNews?: News[];
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
  const {
    flag: isEditNewsModalOpen,
    setFalse: closeEditModal,
    setTrue: openEditModal,
  } = useBooleanState();

  const [deleteId, setDeleteId] = useState<number>(0);
  const [editId, setEditId] = useState<number>();
  const { isInfoVisible, onInfoToggle } = useModal();

  const { mutate } = useDeleteNewsMutation();

  const {
    items: newsItems,
    draggingId: draggingNewsId,
    onDragStart: handleDragStart,
    onDragEnd: handleDragEnd,
    onDragOver: handleDragOver,
    onDrop: handleDrop,
  } = useDragList<News>(latestNews ?? []);

  const handleDeleteNewsItems = (id: number) => {
    mutate(id, {
      onSuccess: closeDeleteModal,
    });
  };

  const handleCloseEditModal = () => {
    closeEditModal();
    setEditId(undefined);
  };

  return (
    <StNewsSectionContainer>
      <StWrapper>
        <StTitleWithIcon>
          최신 소식
          <StIcon onClick={onInfoToggle}>
            <IconInfoCircle />
          </StIcon>
          <Button
            onClick={openAddModal}
            css={{ whiteSpace: 'nowrap', marginLeft: 'auto' }}
            LeftIcon={IconPlus}>
            추가
          </Button>
        </StTitleWithIcon>
        <StContentWrapper>
          <StInputLabel>
            <span>솝트의 최신 소식이 궁금하다면!</span>
            <RequiredIcon />
          </StInputLabel>
          <StDescription>
            최하단 최신 소식 섹션이에요. 리스트 순서대로 배치돼요. 행사 포스터와
            이름, 링크를 추가해주세요.
          </StDescription>

          <StNewsList>
            {newsItems.length === 0 ? <EmptyItem /> : (
              newsItems.map((item) => (
              <NewsItem
                key={item.id}
                news={item}
                isDragging={draggingNewsId === item.id}
                onNewsDragStart={handleDragStart}
                onNewsDragEnd={handleDragEnd}
                onNewsDragOver={handleDragOver}
                onNewsDrop={handleDrop}
                onEdit={() => {
                  setEditId(item.id);
                  openEditModal();
                }}
                onDelete={() => {
                  openDeleteModal();
                  setDeleteId(item.id);
                }}
              />
            )))}
          </StNewsList>
        </StContentWrapper>
      </StWrapper>

      <StNewsModalWrapper>
        <Modal
          title="최신 소식"
          description="메인 홈 ‘솝트의 최신 소식이 궁금하다면!’ 섹션이에요."
          subDescription="리스트 순서대로 배치돼요. 행사 포스터와 이름, 링크를 추가해주세요."
          imgSrc="/images/org/imgLatestNewsInfo.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StNewsModalWrapper>
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
      <EditNewsModal
        isOpen={isEditNewsModalOpen}
        newsId={editId}
        onCancel={handleCloseEditModal}
      />
    </StNewsSectionContainer>
  );
};

export default NewsSection;

import { IconInfoCircle, IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';

import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import { ActionModal } from '@/components/org/OrgAdmin/common/ActionModal';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import { AddNewsModal } from '@/components/org/OrgAdmin/HomeSection/_components/Modal/AddNewsModal';
import { EditNewsModal } from '@/components/org/OrgAdmin/HomeSection/_components/Modal/EditNewsModal';
import EmptyItem from '@/components/org/OrgAdmin/HomeSection/_components/News/EmptyItem';
import NewsItem, {
  type News,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/NewsItem';
import {
  StNewsList,
  StNewsSectionContainer,
} from '@/components/org/OrgAdmin/HomeSection/_components/News/style';
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

type NewsSectionProps = {
  latestNews?: News[];
  isEditable: boolean;
  onChangeNews?: (news: News[]) => void;
};

const EMPTY_NEWS: News[] = [];

const NewsSection = ({
  latestNews,
  isEditable,
  onChangeNews,
}: NewsSectionProps) => {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number>();

  const {
    flag: isAddNewsModalOpen,
    setFalse: closeAddModal,
    setTrue: openAddModal,
  } = useBooleanState();

  const { isInfoVisible, onInfoToggle } = useModal();
  const initialNewsItems = latestNews ?? EMPTY_NEWS;

  const { mutate } = useDeleteNewsMutation();

  const {
    items: newsItems,
    draggingId: draggingNewsId,
    dragHandlers,
  } = useDragList<News>(initialNewsItems);

  useEffect(() => {
    onChangeNews?.(newsItems);
  }, [newsItems, onChangeNews]);

  const handleDeleteNewsItems = (id: number) => {
    mutate(id, {
      onSuccess: () => setDeleteId(null),
    });
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
            disabled={!isEditable}
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
            {newsItems.length === 0 ? (
              <EmptyItem />
            ) : (
              newsItems.map((item) => (
                <NewsItem
                  key={item.id}
                  news={item}
                  isDragging={draggingNewsId === item.id}
                  dragHandlers={dragHandlers}
                  onEdit={() => setEditId(item.id)}
                  onDelete={() => setDeleteId(item.id)}
                  disabled={!isEditable}
                />
              ))
            )}
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
        key={deleteId ?? undefined}
        variant="delete"
        isOpen={deleteId != null}
        onCancel={() => setDeleteId(null)}
        onAction={() => {
          if (deleteId != null) {
            handleDeleteNewsItems(deleteId);
          }
        }}
        alertText="삭제하시겠습니까?"
        description="최신 소식은 ‘배포’버튼을 거치지 않고 즉시 배포가 돼요."
      />
      <AddNewsModal isOpen={isAddNewsModalOpen} onCancel={closeAddModal} />
      <EditNewsModal
        isOpen={editId != null}
        newsId={editId}
        onCancel={() => setEditId(undefined)}
      />
    </StNewsSectionContainer>
  );
};

export default NewsSection;

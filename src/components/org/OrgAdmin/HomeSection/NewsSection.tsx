import { IconInfoCircle, IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';

import { AddNewsModal } from '@/components/org/OrgAdmin/HomeSection/Modal';
import NewsItem from '@/components/org/OrgAdmin/HomeSection/NewsItem';
import { useDeleteNewsMutation } from '@/components/org/OrgAdmin/HomeSection/queries';
import {
  StIcon,
  StInputLabel,
  StLeftColumnSection,
  StNewsHeader,
  StNewsHeaderText,
  StNewsList,
  StNewsSectionContainer,
  StTitleWithIcon,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { useBooleanState } from '@/hooks/useBooleanState';

import RequiredIcon from '../assets/RequiredIcon';
import { ActionModal } from '../common/ActionModal';
import Modal from '../common/Modal';
import useModal from '../common/Modal/useModal';

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
  const { isInfoVisible, onInfoToggle } = useModal();

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
              <StIcon onClick={onInfoToggle}>
                <IconInfoCircle />
              </StIcon>
            </StTitleWithIcon>
            <p>
              &apos;최신 소식&apos;은 배포 버튼을 거치지 않아도 바로 저장되니,
              신중하게 작성해주세요!
            </p>
            <StInputLabel>
              <span>솝트의 최신 소식이 궁금하다면!</span>
              <RequiredIcon />
            </StInputLabel>
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
      <Modal
        title="최신 소식"
        description="메인 홈 '솝트의 최신 소식이 궁금하다면!' 입니다."
        subDescription="리스트 순서대로 배치돼요. 행사 포스터와 이름, 링크를 추가해주세요."
        imgSrc="/images/org/imgLatestNewsInfo.png"
        isInfoVisible={isInfoVisible}
        onInfoToggle={onInfoToggle}
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

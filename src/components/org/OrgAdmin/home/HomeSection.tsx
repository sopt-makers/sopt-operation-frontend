import { useState } from 'react';

import ButtonSection from '@/components/org/OrgAdmin/home/ButtonSection';
import {
  ActionModal,
  AddNewsModal,
} from '@/components/org/OrgAdmin/home/Modal';
import NewsSection from '@/components/org/OrgAdmin/home/NewsSection';
import PartIntroSection from '@/components/org/OrgAdmin/home/PartIntroSection';
import { StContainer, StForm } from '@/components/org/OrgAdmin/home/style';
import { useBooleanState } from '@/hooks/useBooleanState';

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
  const [_btnValues, _setBtnValues] = useState<ButtonInputValue>();
  const [_partValues, _setPartValues] = useState<PartIntroduceInputValue>();

  const { flag: isDeleteModalOpen, setFalse: closeDeleteModal } =
    useBooleanState();
  const { flag: isAddNewsModalOpen } = useBooleanState();

  return (
    <StContainer>
      <StForm>
        <ButtonSection />
        <PartIntroSection />
      </StForm>
      <NewsSection />
      <ActionModal
        type="delete"
        isOpen={isDeleteModalOpen}
        onCancel={closeDeleteModal}
        onAction={() => {}}
        alertText="삭제하시겠습니까?"
        description="최신 소식은 ‘배포’버튼을 거치지 않고 즉시 배포가 돼요."
      />
      <AddNewsModal isOpen={true} />
    </StContainer>
  );
};

export default HomeSection;

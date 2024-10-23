import { useState } from 'react';

import ButtonSection from '@/components/org/OrgAdmin/home/ButtonSection';
import {
  AddNewsModal,
  DeleteModal,
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

  const { flag: isDeleteModalOpen } = useBooleanState();
  const { flag: isAddNewsModalOpen } = useBooleanState();

  return (
    <StContainer>
      <StForm>
        <ButtonSection />
        <PartIntroSection />
      </StForm>
      <NewsSection />
      <DeleteModal isOpen={isDeleteModalOpen} />
      <AddNewsModal isOpen={isAddNewsModalOpen} />
    </StContainer>
  );
};

export default HomeSection;

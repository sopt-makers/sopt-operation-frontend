import { useState } from 'react';

import ButtonSection from '@/components/org/OrgAdmin/home/ButtonSection';
import NewsSection from '@/components/org/OrgAdmin/home/NewsSection';
import PartIntroSection from '@/components/org/OrgAdmin/home/PartIntroSection';
import { StContainer, StForm } from '@/components/org/OrgAdmin/home/style';

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

  return (
    <StContainer>
      <StForm>
        <ButtonSection />
        <PartIntroSection />
      </StForm>
      <NewsSection />
    </StContainer>
  );
};

export default HomeSection;

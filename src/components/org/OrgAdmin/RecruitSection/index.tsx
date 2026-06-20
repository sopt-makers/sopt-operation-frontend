import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import CurriculumSection from '@/components/org/OrgAdmin/RecruitSection/_components/Curriculum';
import FaqSection from '@/components/org/OrgAdmin/RecruitSection/_components/Faq';
import HeaderSection from '@/components/org/OrgAdmin/RecruitSection/_components/Header';
import PartIntroSection from '@/components/org/OrgAdmin/RecruitSection/_components/PartIntroduction';
import { PART_KO } from '@/utils/org';

import { StContainer } from '../style';

interface RecruitSectionProps {
  introPart: PART_KO;
  onChangeIntroPart: (part: PART_KO) => void;
  curriculumPart: PART_KO;
  onChangeCurriculumPart: (part: PART_KO) => void;
  fnaPart: PART_KO;
  onChangeFnaPart: (part: PART_KO) => void;
}

const RecruitSection = ({
  introPart,
  onChangeIntroPart,
  curriculumPart,
  onChangeCurriculumPart,
  fnaPart,
  onChangeFnaPart,
}: RecruitSectionProps) => {
  const { data } = useAdminInfoQuery();
  const { setValue } = useFormContext();

  useEffect(() => {
    if (!data) return;

    data.partIntroduction?.forEach(({ part, description }) => {
      setValue(`partIntroduction${part}`, description ?? '');
    });

    data.partCurriculum?.forEach(({ part, curriculums }) => {
      curriculums?.forEach((curriculum, idx) => {
        setValue(`partCurriculum.${part}.${idx}`, curriculum ?? '');
      });
    });

    data.recruitPartCurriculum?.forEach(({ part, introduction }) => {
      setValue(
        `recruitPartCurriculum.${part}.content`,
        introduction?.content ?? '',
      );
      setValue(
        `recruitPartCurriculum.${part}.preference`,
        introduction?.preference ?? '',
      );
    });
  }, [data, setValue]);

  return (
    <StContainer>
      <HeaderSection />
      <PartIntroSection
        selectedPart={introPart}
        onChangePart={onChangeIntroPart}
      />
      <CurriculumSection
        selectedPart={curriculumPart}
        onChangeSelectedPart={onChangeCurriculumPart}
      />
      <FaqSection fnaPart={fnaPart} onChangeFnaPart={onChangeFnaPart} />
    </StContainer>
  );
};

export default RecruitSection;

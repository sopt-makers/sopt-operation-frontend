import { IconInfoCircle } from '@sopt-makers/icons';
import { useFormContext } from 'react-hook-form';

import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import { PART_KO, PART_LIST, VALIDATION_CHECK } from '@/utils/org';

import { StInput, StTitle, StWrapper } from '../../../AboutSection/style';
import PartCategory from '../../../PartCategory';
import {
  StContentWrapper,
  StInfoButton,
  StModalWrapper,
  StSectionWrapper,
} from '../../style';
import { StItem, StList, StWeek } from './style';

const CURRICULUM = PART_LIST.reduce(
  (acc, part) => {
    acc[part] = Array.from({ length: 8 });
    return acc;
  },
  {} as Record<string, string[]>,
);

interface CurriculumProps {
  isEditable?: boolean;
  selectedPart: PART_KO;
  onChangeSelectedPart: (part: PART_KO) => void;
}

const CurriculumSection = ({
  isEditable = true,
  selectedPart,
  onChangeSelectedPart,
}: CurriculumProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { isInfoVisible, onInfoToggle } = useModal();

  const handleSetSelectedPart = (value: PART_KO) => {
    onChangeSelectedPart(value);
  };

  return (
    <StSectionWrapper>
      <StWrapper>
        <StTitle>
          파트별 커리큘럼
          <StInfoButton onClick={onInfoToggle}>
            <IconInfoCircle />
          </StInfoButton>
        </StTitle>
        <StContentWrapper>
          <PartCategory
            selectedPart={selectedPart}
            onSetSelectedPart={handleSetSelectedPart}
          />
          <StList>
            {CURRICULUM[selectedPart].map((_, idx) => (
              <StItem key={`${selectedPart} week${idx}`}>
                <StWeek htmlFor={`${selectedPart} week${idx}`}>
                  0{idx + 1}
                </StWeek>
                <StInput
                  {...register(`partCurriculum.${selectedPart}.${idx}`, {
                    required: true && VALIDATION_CHECK.required.errorText,
                  })}
                  disabled={!isEditable}
                  isError={
                    (errors as any).partCurriculum?.[selectedPart]?.[idx]
                      ?.message !== undefined
                  }
                  errorMessage={
                    (errors as any).partCurriculum?.[selectedPart]?.[idx]
                      ?.message as string
                  }
                  id={`${selectedPart} week${idx}`}
                  placeholder={`${idx + 1}주차 커리큘럼을 작성해주세요.`}
                />
              </StItem>
            ))}
          </StList>
        </StContentWrapper>
      </StWrapper>
      <StModalWrapper>
        <Modal
          title="파트별 커리큘럼"
          description="소개 탭과 파트별 지원 안내 페이지에 사용돼요."
          subDescription="주차별 커리큘럼을 차례대로 입력해주세요."
          imgSrc="/images/org/imgPartCurriculum.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StModalWrapper>
    </StSectionWrapper>
  );
};

export default CurriculumSection;

'use client';

import { IconInfoCircle } from '@sopt-makers/icons';
import { Chip, TextArea } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import { PARTS } from '@/components/org/OrgAdmin/HomeSection/constant';
import {
  StChipsContainer,
  StIcon,
  StInputLabel,
  StSecondSectionContainer,
  StTextAreaContainer,
  StTitleWithIcon,
} from '@/components/org/OrgAdmin/HomeSection/style';
import { PART_KO, VALIDATION_CHECK } from '@/utils/org';

import RequiredIcon from '../assets/RequiredIcon';
import Modal from '../common/Modal';
import useModal from '../common/Modal/useModal';

type PartIntroSectionProps = {
  selectedPart: PART_KO;
  onChangePart: (id: PART_KO) => void;
};

const PartIntroSection = ({
  selectedPart,
  onChangePart,
}: PartIntroSectionProps) => {
  const { isInfoVisible, onInfoToggle } = useModal();

  const {
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const getActiveStatus = (id: PART_KO) => id === selectedPart;

  const handleSelectChip = (id: PART_KO) => {
    onChangePart(id);
  };

  const handleValidation = (field: string, value: string) => {
    if (value) {
      clearErrors(field);
    } else {
      setError(field, {
        type: 'required',
        message: '필수 항목이에요.',
      });
    }
  };

  return (
    <StSecondSectionContainer>
      <StTextAreaContainer>
        <StTitleWithIcon>
          <span>파트별 소개</span>
          <StIcon onClick={onInfoToggle}>
            <IconInfoCircle />
          </StIcon>
        </StTitleWithIcon>
        <StInputLabel>
          <span>파트별 소개 설명</span>
          <RequiredIcon />
        </StInputLabel>
        <StChipsContainer>
          {PARTS.map((part) => (
            <Chip
              key={part}
              active={getActiveStatus(part)}
              onClick={() => handleSelectChip(part)}>
              {part}
            </Chip>
          ))}
        </StChipsContainer>

        <TextArea
          key={selectedPart}
          {...register(`partIntroduction${selectedPart}`, {
            required: VALIDATION_CHECK.required.errorText,
          })}
          onChange={(e) =>
            handleValidation(
              `partIntroduction${selectedPart}`,
              e.currentTarget.value,
            )
          }
          isError={!!errors[`partIntroduction${selectedPart}`]}
          errorMessage={
            errors[`partIntroduction${selectedPart}`]?.message as string
          }
          required
          fixedHeight={230}
          maxHeight={230}
          placeholder={
            '파트별 설명을 작성해주세요. \nex.\n 린스타트업에 기초해 고객 문제정의 - 고객 발굴 - 검증 과정을 거쳐 비즈니스 전략과 핵심지표 설계까지 고객 관점 프로덕트를 만들고 운영하기 위한 모든 과정을 다룹니다.'
          }
        />
      </StTextAreaContainer>
      <Modal
        title="파트별 소개"
        description="메인 홈 'Part' 속 파트별 소개에요"
        subDescription="파트의 간략한 소개를 작성해주세요."
        imgSrc="/images/org/imgPartInfo.png"
        isInfoVisible={isInfoVisible}
        onInfoToggle={onInfoToggle}
      />
    </StSecondSectionContainer>
  );
};

export default PartIntroSection;

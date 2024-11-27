import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import PartCategory from '../PartCategory';
import { StTextArea, StTitle, StTitleWrapper, StWrapper } from '../style';
import { StTextAreaWrapper } from './style';

const PartCurriculum = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedPart, setSelectedPart] = useState('기획');

  const handleSetSelectedPart = (value: string) => {
    setSelectedPart(value);
  };

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>파트별 인재상</StTitle>
      </StTitleWrapper>
      <PartCategory
        selectedPart={selectedPart}
        onSetSelectedPart={handleSetSelectedPart}
      />
      <StTextAreaWrapper key={selectedPart}>
        <StTextArea
          {...register(`recruitPartCurriculum_${selectedPart}_content`, {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          topAddon={{
            labelText: `${selectedPart} 파트는 이런 걸 배워요.`,
          }}
          fixedHeight={158}
          maxHeight={158}
          placeholder="파트별 설명을 작성해주세요."
          isError={
            errors[`recruitPartCurriculum_${selectedPart}_content`]?.message !=
            undefined
          }
          errorMessage={
            errors[`recruitPartCurriculum_${selectedPart}_content`]
              ?.message as string
          }
        />
        <StTextArea
          {...register(`recruitPartCurriculum_${selectedPart}_preference`, {
            required: true && VALIDATION_CHECK.required.errorText,
          })}
          topAddon={{
            labelText: '이런 분이면 좋아요!',
          }}
          fixedHeight={230}
          maxHeight={230}
          placeholder={`파트별 인재상을 작성해주세요.
ex.
- 어려움과 고민을 편하게 나누고 공감할 수 있는 유대감과 열린 마음을 가진 분
- 타 파트와 협업하며 존중과 신뢰를 바탕으로 원활한 팀워크를 만들어갈 수 있는 분`}
          isError={
            errors[`recruitPartCurriculum_${selectedPart}_preference`]
              ?.message != undefined
          }
          errorMessage={
            errors[`recruitPartCurriculum_${selectedPart}_preference`]
              ?.message as string
          }
        />
      </StTextAreaWrapper>
    </StWrapper>
  );
};

export default PartCurriculum;

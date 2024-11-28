import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { PART_KO, PART_LIST, VALIDATION_CHECK } from '@/utils/org';

import PartCategory from '../../PartCategory';
import { StInput, StTitle, StWrapper } from '../style';
import { StContentWrapper, StItem, StList, StWeek } from './style';

const CURRICULUM = PART_LIST.reduce(
  (acc, part) => {
    acc[part] = Array.from({ length: 8 });
    return acc;
  },
  {} as Record<string, string[]>,
);

const Curriculum = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [selectedPart, setSelectedPart] = useState<PART_KO>('기획');

  const handleSetSelectedPart = (value: PART_KO) => {
    setSelectedPart(value);
  };

  return (
    <StWrapper>
      <StTitle>파트별 커리큘럼</StTitle>
      <StContentWrapper>
        <PartCategory
          selectedPart={selectedPart}
          onSetSelectedPart={handleSetSelectedPart}
        />
        <StList>
          {CURRICULUM[selectedPart].map((_, idx) => (
            <StItem key={`${selectedPart} week${idx + 1}`}>
              <StWeek htmlFor={`${selectedPart} week${idx + 1}`}>
                0{idx + 1}
              </StWeek>
              <StInput
                {...register(`partCurriculum_${selectedPart}_${idx}`, {
                  required: true && VALIDATION_CHECK.required.errorText,
                })}
                isError={
                  errors[`partCurriculum_${selectedPart}_${idx}`]?.message !==
                  undefined
                }
                errorMessage={
                  errors[`partCurriculum_${selectedPart}_${idx}`]
                    ?.message as string
                }
                id={`${selectedPart} week${idx}`}
                style={{ width: '553px' }}
                placeholder={`${selectedPart} 파트 ${idx + 1}주차 커리큘럼을 작성해주세요.`}
              />
            </StItem>
          ))}
        </StList>
      </StContentWrapper>
    </StWrapper>
  );
};

export default Curriculum;

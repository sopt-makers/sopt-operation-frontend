import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import PartCategory from '../PartCategory';
import { StTextArea, StTitle, StTitleWrapper, StWrapper } from '../style';
import { StFnaWrapper, StTextAreaWrapper } from './style';

const Fna = () => {
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
        <StTitle>자주 묻는 질문</StTitle>
      </StTitleWrapper>
      <PartCategory
        selectedPart={selectedPart}
        onSetSelectedPart={handleSetSelectedPart}
      />
      <StTextAreaWrapper key={selectedPart}>
        <StFnaWrapper>
          <StTextArea
            {...register(
              `recruitQuestion.${selectedPart}.questions.0.question`,
              {
                required: true && VALIDATION_CHECK.required.errorText,
              },
            )}
            topAddon={{
              labelText: '질문1',
            }}
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
          <StTextArea
            {...register(`recruitQuestion.${selectedPart}.questions.0.answer`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register(
              `recruitQuestion.${selectedPart}.questions.1.question`,
              {
                required: true && VALIDATION_CHECK.required.errorText,
              },
            )}
            topAddon={{
              labelText: '질문2',
            }}
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
          <StTextArea
            {...register(`recruitQuestion.${selectedPart}.questions.1.answer`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register(
              `recruitQuestion.${selectedPart}.questions.2.question`,
              {
                required: true && VALIDATION_CHECK.required.errorText,
              },
            )}
            topAddon={{
              labelText: '질문3',
            }}
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
          <StTextArea
            {...register(`recruitQuestion.${selectedPart}.questions.2.answer`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
        </StFnaWrapper>
      </StTextAreaWrapper>
    </StWrapper>
  );
};

export default Fna;

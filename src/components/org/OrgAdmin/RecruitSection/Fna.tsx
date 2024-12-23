import { useFormContext } from 'react-hook-form';

import { PART_KO, VALIDATION_CHECK } from '@/utils/org';

import PartCategory from '../PartCategory';
import { StTextArea, StTitle, StTitleWrapper, StWrapper } from '../style';
import { StFnaWrapper, StTextAreaWrapper } from './style';

const QUESTION_NUMBERS = [0, 1, 2];

interface FnaProps {
  fnaPart: PART_KO;
  onChangeFnaPart: (part: PART_KO) => void;
}

const Fna = ({ fnaPart, onChangeFnaPart }: FnaProps) => {
  const {
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const handleSetSelectedPart = (value: PART_KO) => {
    onChangeFnaPart(value);
  };

  const handleValidation = (field: string, value: string) => {
    if (value) {
      clearErrors(field);
    } else {
      setError(field, {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });
    }
  };

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>자주 묻는 질문</StTitle>
      </StTitleWrapper>
      <PartCategory
        selectedPart={fnaPart}
        onSetSelectedPart={handleSetSelectedPart}
      />
      <StTextAreaWrapper key={fnaPart}>
        {QUESTION_NUMBERS.map((index) => (
          <StFnaWrapper key={index}>
            <StTextArea
              {...register(`recruitQuestion.${fnaPart}.question${index}`, {
                required: VALIDATION_CHECK.required.errorText,
              })}
              topAddon={{
                labelText: `질문 ${index + 1}`,
              }}
              required
              fixedHeight={74}
              maxHeight={74}
              placeholder="질문을 입력해주세요."
              onChange={(e) =>
                handleValidation(
                  `recruitQuestion.${fnaPart}.question${index}`,
                  e.currentTarget.value,
                )
              }
              isError={
                !!(errors as any).recruitQuestion?.[fnaPart]?.[
                  `question${index}`
                ]?.message
              }
              errorMessage={
                (errors as any).recruitQuestion?.[fnaPart]?.[`question${index}`]
                  ?.message as string
              }
            />
            <StTextArea
              {...register(`recruitQuestion.${fnaPart}.answer${index}`, {
                required: VALIDATION_CHECK.required.errorText,
              })}
              fixedHeight={74}
              maxHeight={74}
              placeholder="답변을 입력해주세요."
              onChange={(e) =>
                handleValidation(
                  `recruitQuestion.${fnaPart}.answer${index}`,
                  e.currentTarget.value,
                )
              }
              isError={
                !!(errors as any).recruitQuestion?.[fnaPart]?.[`answer${index}`]
                  ?.message
              }
              errorMessage={
                (errors as any).recruitQuestion?.[fnaPart]?.[`answer${index}`]
                  ?.message as string
              }
            />
          </StFnaWrapper>
        ))}
      </StTextAreaWrapper>
    </StWrapper>
  );
};

export default Fna;

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { PART_KO, VALIDATION_CHECK } from '@/utils/org';

import PartCategory from '../PartCategory';
import { StTextArea, StTitle, StTitleWrapper, StWrapper } from '../style';
import { StFnaWrapper, StTextAreaWrapper } from './style';

interface FanProps {
  fnaPart: PART_KO;
  onChangeFnaPart: (part: PART_KO) => void;
}

const Fna = ({ fnaPart, onChangeFnaPart }: FanProps) => {
  const {
    register,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();
  const handleSetSelectedPart = (value: PART_KO) => {
    onChangeFnaPart(value);
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
        <StFnaWrapper>
          <StTextArea
            {...register(`recruitQuestion_${fnaPart}_questions_0_question`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            topAddon={{
              labelText: '질문1',
            }}
            required
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            onChange={(e) => {
              if (e.currentTarget.value) {
                clearErrors(`recruitQuestion_${fnaPart}_questions_0_question`);
              } else {
                setError(`recruitQuestion_${fnaPart}_questions_0_question`, {
                  type: 'required',
                  message: VALIDATION_CHECK.required.errorText,
                });
              }
            }}
            isError={
              errors[`recruitQuestion_${fnaPart}_questions_0_question`]
                ?.message != undefined
            }
            errorMessage={
              errors[`recruitQuestion_${fnaPart}_questions_0_question`]
                ?.message as string
            }
          />
          <StTextArea
            {...register(`recruitQuestion_${fnaPart}_questions_0_answer`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            required
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            onChange={(e) => {
              if (e.currentTarget.value) {
                clearErrors(`recruitQuestion_${fnaPart}_questions_0_answer`);
              } else {
                setError(`recruitQuestion_${fnaPart}_questions_0_answer`, {
                  type: 'required',
                  message: VALIDATION_CHECK.required.errorText,
                });
              }
            }}
            isError={
              errors[`recruitQuestion_${fnaPart}_questions_0_answer`]
                ?.message != undefined
            }
            errorMessage={
              errors[`recruitQuestion_${fnaPart}_questions_0_answer`]
                ?.message as string
            }
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register(`recruitQuestion_${fnaPart}_questions_1_question`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            topAddon={{
              labelText: '질문2',
            }}
            required
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            onChange={(e) => {
              if (e.currentTarget.value) {
                clearErrors(`recruitQuestion_${fnaPart}_questions_1_question`);
              } else {
                setError(`recruitQuestion_${fnaPart}_questions_1_question`, {
                  type: 'required',
                  message: VALIDATION_CHECK.required.errorText,
                });
              }
            }}
            isError={
              errors[`recruitQuestion_${fnaPart}_questions_1_question`]
                ?.message != undefined
            }
            errorMessage={
              errors[`recruitQuestion_${fnaPart}_questions_1_question`]
                ?.message as string
            }
          />
          <StTextArea
            {...register(`recruitQuestion_${fnaPart}_questions_1_answer`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            required
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            onChange={(e) => {
              if (e.currentTarget.value) {
                clearErrors(`recruitQuestion_${fnaPart}_questions_1_answer`);
              } else {
                setError(`recruitQuestion_${fnaPart}_questions_1_answer`, {
                  type: 'required',
                  message: VALIDATION_CHECK.required.errorText,
                });
              }
            }}
            isError={
              errors[`recruitQuestion_${fnaPart}_questions_1_answer`]
                ?.message != undefined
            }
            errorMessage={
              errors[`recruitQuestion_${fnaPart}_questions_1_answer`]
                ?.message as string
            }
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register(`recruitQuestion_${fnaPart}_questions_2_question`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            topAddon={{
              labelText: '질문3',
            }}
            required
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            onChange={(e) => {
              if (e.currentTarget.value) {
                clearErrors(`recruitQuestion_${fnaPart}_questions_2_question`);
              } else {
                setError(`recruitQuestion_${fnaPart}_questions_2_question`, {
                  type: 'required',
                  message: VALIDATION_CHECK.required.errorText,
                });
              }
            }}
            isError={
              errors[`recruitQuestion_${fnaPart}_questions_2_question`]
                ?.message != undefined
            }
            errorMessage={
              errors[`recruitQuestion_${fnaPart}_questions_2_question`]
                ?.message as string
            }
          />
          <StTextArea
            {...register(`recruitQuestion_${fnaPart}_questions_2_answer`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            onChange={(e) => {
              if (e.currentTarget.value) {
                clearErrors(`recruitQuestion_${fnaPart}_questions_2_answer`);
              } else {
                setError(`recruitQuestion_${fnaPart}_questions_2_answer`, {
                  type: 'required',
                  message: VALIDATION_CHECK.required.errorText,
                });
              }
            }}
            isError={
              errors[`recruitQuestion_${fnaPart}_questions_2_answer`]
                ?.message != undefined
            }
            errorMessage={
              errors[`recruitQuestion_${fnaPart}_questions_2_answer`]
                ?.message as string
            }
          />
        </StFnaWrapper>
      </StTextAreaWrapper>
    </StWrapper>
  );
};

export default Fna;

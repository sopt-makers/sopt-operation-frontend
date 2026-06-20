import { IconInfoCircle, IconPlus } from '@sopt-makers/icons';
import { Button, useDialog } from '@sopt-makers/ui';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import IconXCircleFilled from '@/components/icons/IconXCircleFilled';
import {
  StTitle,
  StWrapper,
} from '@/components/org/OrgAdmin/AboutSection/style';
import Modal from '@/components/org/OrgAdmin/common/Modal';
import useModal from '@/components/org/OrgAdmin/common/Modal/useModal';
import { useAdminInfoQuery } from '@/components/org/OrgAdmin/HomeSection/queries';
import { ERROR_MESSAGES } from '@/components/org/OrgAdmin/RecruitSection/_constants/constants';
import {
  FAQ_DEFAULT_QUESTION_COUNT,
  FAQ_MAX_QUESTION_COUNT,
  PART_KO,
  PART_LIST,
  VALIDATION_CHECK,
} from '@/utils/org';

import PartCategory from '../../../PartCategory';
import {
  StContentWrapper,
  StInfoButton,
  StModalWrapper,
  StSectionWrapper,
  StTextAreaWrapper,
} from '../../style';
import {
  StAnswerTextArea,
  StDeleteButton,
  StFnaHeader,
  StFnaTitle,
  StFnaWrapper,
  StQuestionTextArea,
} from './style';

type QuestionCounts = Record<PART_KO, number>;

const createDefaultCounts = (): QuestionCounts =>
  PART_LIST.reduce(
    (acc, part) => ({ ...acc, [part]: FAQ_DEFAULT_QUESTION_COUNT }),
    {} as QuestionCounts,
  );

interface Props {
  isEditable: boolean;
  resetKey: number;
  fnaPart: PART_KO;
  onChangeFnaPart: (part: PART_KO) => void;
}

const FaqSection = ({
  isEditable,
  resetKey,
  fnaPart,
  onChangeFnaPart,
}: Props) => {
  const {
    register,
    getValues,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useFormContext();

  const { isInfoVisible, onInfoToggle } = useModal();
  const { open: openDialog } = useDialog();
  const { data } = useAdminInfoQuery();

  const [questionCounts, setQuestionCounts] =
    useState<QuestionCounts>(createDefaultCounts);

  const textAreaContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!data?.recruitQuestion) {
      setQuestionCounts(createDefaultCounts());
      return;
    }

    const next = createDefaultCounts();

    data.recruitQuestion.forEach(({ part, questions }) => {
      if (!part || !questions?.length) return;

      const count = Math.min(questions.length, FAQ_MAX_QUESTION_COUNT);
      next[part as PART_KO] = Math.max(count, FAQ_DEFAULT_QUESTION_COUNT);
    });

    setQuestionCounts(next);
  }, [data, resetKey]);

  const currentCount = questionCounts[fnaPart];

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

  const handleAddQuestion = () => {
    setQuestionCounts((prev) => ({
      ...prev,
      [fnaPart]: Math.min(prev[fnaPart] + 1, FAQ_MAX_QUESTION_COUNT),
    }));
  };

  const handleDeleteQuestion = (targetIndex: number) => {
    const count = questionCounts[fnaPart];

    // 삭제 인덱스 뒤의 값들을 한 칸씩 앞으로 당겨 위에서부터 다시 정렬
    for (let index = targetIndex; index < count - 1; index += 1) {
      setValue(
        `recruitQuestion.${fnaPart}.question${index}`,
        getValues(`recruitQuestion.${fnaPart}.question${index + 1}`) ?? '',
      );
      setValue(
        `recruitQuestion.${fnaPart}.answer${index}`,
        getValues(`recruitQuestion.${fnaPart}.answer${index + 1}`) ?? '',
      );
    }

    const lastIndex = count - 1;
    setValue(`recruitQuestion.${fnaPart}.question${lastIndex}`, '');
    setValue(`recruitQuestion.${fnaPart}.answer${lastIndex}`, '');
    clearErrors(`recruitQuestion.${fnaPart}.question${lastIndex}`);
    clearErrors(`recruitQuestion.${fnaPart}.answer${lastIndex}`);

    setQuestionCounts((prev) => ({
      ...prev,
      [fnaPart]: prev[fnaPart] - 1,
    }));
  };

  const openDeleteDialog = (targetIndex: number) => {
    openDialog({
      title: `질문 ${targetIndex + 1}을 삭제하시겠습니까?`,
      description: '삭제한 내용은 복구할 수 없습니다.',
      type: 'default',
      typeOptions: {
        cancelButtonText: '취소',
        approveButtonText: '삭제',
        buttonFunction: () => handleDeleteQuestion(targetIndex),
      },
    });
  };

  // setValue로 채운 값은 onChange를 거치지 않아 자동 높이 계산이 안 되므로 직접 재계산
  useLayoutEffect(() => {
    const container = textAreaContainerRef.current;
    if (!container) return;

    container.querySelectorAll('textarea').forEach((textarea) => {
      textarea.style.height = '1px';
      textarea.style.height = `${textarea.scrollHeight}px`;
    });
  }, [data, fnaPart, currentCount]);

  return (
    <StSectionWrapper>
      <StWrapper>
        <StTitle>
          자주 묻는 질문
          <StInfoButton onClick={onInfoToggle}>
            <IconInfoCircle />
          </StInfoButton>
        </StTitle>
        <StContentWrapper>
          <PartCategory
            selectedPart={fnaPart}
            onSetSelectedPart={handleSetSelectedPart}
          />
          <StTextAreaWrapper key={fnaPart} ref={textAreaContainerRef}>
            {Array.from({ length: currentCount }, (_, index) => (
              <StFnaWrapper key={index}>
                <StFnaHeader>
                  <StFnaTitle>질문 {index + 1}</StFnaTitle>
                  {isEditable && currentCount > 1 && (
                    <StDeleteButton
                      type="button"
                      aria-label={`질문 ${index + 1} 삭제`}
                      onClick={() => openDeleteDialog(index)}>
                      <IconXCircleFilled />
                    </StDeleteButton>
                  )}
                </StFnaHeader>
                <StQuestionTextArea
                  {...register(`recruitQuestion.${fnaPart}.question${index}`, {
                    required: VALIDATION_CHECK.required.errorText,
                  })}
                  topAddon={{
                    labelText: '질문',
                  }}
                  required
                  disabled={!isEditable}
                  maxHeight={9999}
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
                  errorMessage={ERROR_MESSAGES.question}
                />
                <StAnswerTextArea
                  {...register(`recruitQuestion.${fnaPart}.answer${index}`, {
                    required: VALIDATION_CHECK.required.errorText,
                  })}
                  topAddon={{
                    labelText: '답변',
                  }}
                  required
                  disabled={!isEditable}
                  maxHeight={9999}
                  placeholder="답변을 입력해주세요."
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    handleValidation(
                      `recruitQuestion.${fnaPart}.answer${index}`,
                      e.currentTarget.value,
                    )
                  }
                  isError={
                    !!(errors as any).recruitQuestion?.[fnaPart]?.[
                      `answer${index}`
                    ]?.message
                  }
                  errorMessage={ERROR_MESSAGES.answer}
                />
              </StFnaWrapper>
            ))}
            {isEditable && currentCount < FAQ_MAX_QUESTION_COUNT && (
              <Button
                theme="white"
                LeftIcon={IconPlus}
                onClick={handleAddQuestion}
                css={{ width: 'fit-content' }}>
                추가
              </Button>
            )}
          </StTextAreaWrapper>
        </StContentWrapper>
      </StWrapper>
      <StModalWrapper>
        <Modal
          title="자주 묻는 질문"
          description="모집안내 탭 ‘자주 묻는 질문' 섹션에 사용돼요."
          subDescription="자주 들어오는 질문을 등록해보세요."
          imgSrc="/images/org/imgFaq.png"
          isInfoVisible={isInfoVisible}
          onInfoToggle={onInfoToggle}
        />
      </StModalWrapper>
    </StSectionWrapper>
  );
};

export default FaqSection;

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

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>자주 묻는 질문</StTitle>
      </StTitleWrapper>
      <PartCategory />
      <StTextAreaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register('frequentQuestion1', {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            topAddon={{
              labelText: '질문1',
            }}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
          <StTextArea
            {...register('frequentQuestionAnswer1', {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register('frequentQuestion2', {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            topAddon={{
              labelText: '질문2',
            }}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
          <StTextArea
            {...register('frequentQuestionAnswer2', {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="답변을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
        </StFnaWrapper>
        <StFnaWrapper>
          <StTextArea
            {...register('frequentQuestion3', {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            topAddon={{
              labelText: '질문3',
            }}
            value=""
            fixedHeight={74}
            maxHeight={74}
            placeholder="질문을 입력해주세요."
            isError={errors.partCurriculum?.message != undefined}
            errorMessage={errors.partCurriculum?.message as string}
          />
          <StTextArea
            {...register('frequentQuestionAnswer3', {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            value=""
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

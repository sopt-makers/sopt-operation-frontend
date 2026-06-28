import { Controller, useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import RequiredIcon from '../../assets/RequiredIcon';
import { useAdminInfoQuery } from '../../HomeSection/queries';
import MyDropzone from '../../MyDropzone';
import { StDescription, StInput, StInputLabel } from '../style';
import {
  StInputBox,
  StInputWrapper,
  StTextArea,
  StValueWrapper,
} from './style';

interface CoreValueItemProps {
  index: 1 | 2 | 3;
  isEditable?: boolean;
}

const CORE_VALUE_COPY = {
  1: {
    valuePlaceholder: 'ex. 용기',
    descriptionPlaceholder: 'ex. 새로운 도전을 위해 과감히 용기내는 사람',
    detailPlaceholder:
      'ex. 솝트는 쉽게 포기하지 않습니다. 어떤 어려움이 있더라도 끝까지 고민하고, 끝까지 해내며 앞으로 나아갑니다. 서로의 의지는 또 다른 의지가 되어 우리를 계속 움직이게 합니다.',
  },
  2: {
    valuePlaceholder: 'ex. 몰입',
    descriptionPlaceholder: 'ex. 포기하지 않고 깊이 몰입하는 사람',
    detailPlaceholder:
      'ex. 솝트에서는 아이디어를 말로만 남겨두지 않습니다. 생각한 것을 직접 만들고, 시도하고, 부딪히며 현실로 만들어냅니다. 실행을 통해 우리는 더 빠르게 배우고 성장합니다.',
  },
  3: {
    valuePlaceholder: 'ex. 화합',
    descriptionPlaceholder: 'ex. 서로를 배려하며 함께 화합하는 사람',
    detailPlaceholder:
      'ex. 솝트에서는 200여명의 활동 회원과 4000여명의 명예 회원들이 서로의 경험과 역량을 연결하며 함께 문제를 해결합니다. 우리는 함께이기에 더 멀리 나아갈 수 있다고 믿습니다.',
  },
} as const;

const CoreValueItem = ({ index, isEditable = true }: CoreValueItemProps) => {
  const fieldKey = `coreValue${index}` as const;
  const method = useFormContext();
  const {
    register,
    control,
    formState: { errors },
  } = method;
  const { data } = useAdminInfoQuery();

  const coreValueErrors = (errors as any)[fieldKey] ?? {};
  const copy = CORE_VALUE_COPY[index];

  return (
    <StValueWrapper>
      <StInputLabel>
        <span>핵심 가치 {index}</span>
        <RequiredIcon />
      </StInputLabel>
      <StDescription>이미지는 380x323으로 올려주세요.</StDescription>
      <StInputWrapper>
        <MyDropzone
          method={method}
          label={`${fieldKey}.imageFileName`}
          width="224px"
          height="190px"
          required
          disabled={!isEditable}
          defaultPreviewUrl={data?.coreValue?.[index - 1]?.image}
        />
        <StInputBox>
          <StInput
            {...register(`${fieldKey}.value`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            isError={coreValueErrors?.value?.message !== undefined}
            errorMessage={coreValueErrors?.value?.message as string}
            labelText="가치"
            required
            disabled={!isEditable}
            placeholder={copy.valuePlaceholder}
          />
          <StInput
            {...register(`${fieldKey}.description`, {
              required: true && VALIDATION_CHECK.required.errorText,
            })}
            isError={coreValueErrors?.description?.message !== undefined}
            errorMessage={coreValueErrors?.description?.message as string}
            labelText="가치 설명"
            required
            disabled={!isEditable}
            placeholder={copy.descriptionPlaceholder}
          />
          <Controller
            control={control}
            name={`${fieldKey}.detailDescription`}
            rules={{
              required: VALIDATION_CHECK.required.errorText,
              maxLength: {
                value: 100,
                message: '최대 100자까지 입력할 수 있어요.',
              },
            }}
            render={({ field }) => (
              <StTextArea
                {...field}
                value={field.value ?? ''}
                isError={
                  coreValueErrors?.detailDescription?.message !== undefined
                }
                errorMessage={
                  coreValueErrors?.detailDescription?.message as string
                }
                topAddon={{
                  labelText: '가치 세부 설명',
                  descriptionText: '‘-습니다’체를 사용해 주세요.',
                }}
                required
                disabled={!isEditable}
                fixedHeight={126}
                maxLength={100}
                placeholder={copy.detailPlaceholder}
              />
            )}
          />
        </StInputBox>
      </StInputWrapper>
    </StValueWrapper>
  );
};

export default CoreValueItem;

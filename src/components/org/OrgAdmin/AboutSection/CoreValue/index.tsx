import { useFormContext } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import RequiredIcon from '../../assets/RequiredIcon';
import MyDropzone from '../../MyDropzone';
import {
  StDescription,
  StInput,
  StInputLabel,
  StTitle,
  StWrapper,
} from '../style';
import { StInputBox, StInputWrapper, StValueWrapper } from './style';

const CoreValue = () => {
  const method = useFormContext();
  const {
    register,
    formState: { errors },
  } = method;
  return (
    <StWrapper>
      <StTitle>핵심 가치</StTitle>
      <StValueWrapper>
        <StInputLabel>
          <span>핵심 가치 1</span>
          <RequiredIcon />
        </StInputLabel>
        <StDescription>이미지는 380x323으로 올려주세요.</StDescription>
        <StInputWrapper>
          <MyDropzone
            method={method}
            label={'coreValue1.imageFileName'}
            width="224px"
            height="190px"
            required
          />
          <StInputBox>
            <StInput
              {...register('coreValue1.value', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              isError={(errors as any).coreValue1?.value?.message !== undefined}
              errorMessage={
                (errors as any).coreValue1?.value?.message as string
              }
              labelText="가치"
              required
              placeholder="ex. 용기"
            />
            <StInput
              {...register('coreValue1.description', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              isError={
                (errors as any).coreValue1?.description?.message !== undefined
              }
              errorMessage={
                (errors as any).coreValue1?.description?.message as string
              }
              labelText="가치 설명"
              required
              descriptionText="호버 시, 보이는 문구예요."
              placeholder="ex. 새로운 도전을 위해 과감히 용기내는 사람"
            />
          </StInputBox>
        </StInputWrapper>
      </StValueWrapper>
      <StValueWrapper>
        <StInputLabel>
          <span>핵심 가치 2</span>
          <RequiredIcon />
        </StInputLabel>
        <StDescription>이미지는 380x323으로 올려주세요.</StDescription>
        <StInputWrapper>
          <MyDropzone
            method={method}
            label={'coreValue2.imageFileName'}
            width="224px"
            height="190px"
            required
          />
          <StInputBox>
            <StInput
              {...register('coreValue2.value', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              isError={(errors as any).coreValue2?.value?.message !== undefined}
              errorMessage={
                (errors as any).coreValue2?.value?.message as string
              }
              labelText="가치"
              placeholder="ex. 몰입"
              required
            />
            <StInput
              {...register('coreValue2.description', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              isError={
                (errors as any).coreValue2?.description?.message !== undefined
              }
              errorMessage={
                (errors as any).coreValue2?.description?.message as string
              }
              labelText="가치 설명"
              descriptionText="호버 시, 보이는 문구예요."
              placeholder="ex. 포기하지 않고 깊이 몰입하는 사람"
              required
            />
          </StInputBox>
        </StInputWrapper>
      </StValueWrapper>
      <StValueWrapper>
        <StInputLabel>
          <span>핵심 가치 3</span>
          <RequiredIcon />
        </StInputLabel>
        <StDescription>이미지는 380x323으로 올려주세요.</StDescription>
        <StInputWrapper>
          <MyDropzone
            method={method}
            label={'coreValue3.imageFileName'}
            width="224px"
            height="190px"
            required
          />
          <StInputBox>
            <StInput
              {...register('coreValue3.value', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              isError={(errors as any).coreValue3?.value?.message !== undefined}
              errorMessage={
                (errors as any).coreValue3?.value?.message as string
              }
              labelText="가치"
              placeholder="ex. 화합"
              required
            />
            <StInput
              {...register('coreValue3.description', {
                required: true && VALIDATION_CHECK.required.errorText,
              })}
              isError={
                (errors as any).coreValue3?.description?.message !== undefined
              }
              errorMessage={
                (errors as any).coreValue3?.description?.message as string
              }
              labelText="가치 설명"
              descriptionText="호버 시, 보이는 문구예요."
              placeholder="ex. 서로를 배려하며 함께 화합하는 사람"
              required
            />
          </StInputBox>
        </StInputWrapper>
      </StValueWrapper>
    </StWrapper>
  );
};

export default CoreValue;

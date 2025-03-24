import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Radio, TextField } from '@sopt-makers/ui';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';
import { FieldError, FieldErrors } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import {
  type FieldValues,
  FormProvider,
  type SubmitHandler,
  useForm,
} from 'react-hook-form';

import BannerImageRegister from '@/components/bannerAdmin/BannerImageRegister';
import CalendarInputForm from '@/components/bannerAdmin/form/Calendar';
import FormController from '@/components/bannerAdmin/form/FormController';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

interface CreateBannerModalProps {
  onClose: () => void;
}

const CATEGORY_LIST = ['프로덕트 홍보', '기타 홍보', '생일 광고'];

const POSITION_LIST = ['커뮤니티', '전체모임', '모임피드'];

const CreateBannerModal = ({ onClose }: CreateBannerModalProps) => {
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);

  const method = useForm({
    defaultValues: {
      name: '',
      link: '',
      category: '프로덕트 홍보',
      position: '커뮤니티',
      pcImageFileName: '',
      mobileImageFileName: '',
    },
  });

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    getValues,
  } = method;

  console.log(getValues());
  return (
    <StCreateBannerModalWrapper>
      <ModalHeader title="신규 배너 등록" onClose={onClose} />
      <FormProvider {...method}>
        <form onSubmit={handleSubmit((data) => alert(JSON.stringify(data)))}>
          <StMain>
            <TextField
              id="name"
              labelText="광고 요청자"
              placeholder="광고 요청자 이름을 입력하세요."
              required={true}
              {...register('name')}
            />

            <TextField
              id="link"
              labelText="[선택] 링크 첨부"
              placeholder="이동할 링크를 입력하세요."
              {...register('link')}
            />

            <StContentWrapper>
              <StInputLabel>
                <span>노출 일자</span>
                <RequiredIcon />
              </StInputLabel>
              <StDateFieldWrapper>
                <StDateField>
                  <FormController
                    name="detail.mStartDate"
                    render={({ field, formState: { errors } }) => {
                      const dateError = errors.detail as
                        | (FieldError & {
                            mStartDate?: FieldError;
                            mEndDate?: FieldError;
                          })
                        | undefined;
                      return (
                        <CalendarInputForm
                          selectedDate={field.value}
                          setSelectedDate={field.onChange}
                          error={
                            dateError?.mStartDate?.message ||
                            dateError?.mEndDate?.message
                          }
                        />
                      );
                    }}></FormController>
                </StDateField>
                <span style={{ marginTop: '14px' }}>-</span>
                <StDateField>
                  <FormController
                    name="detail.mEndDate"
                    render={({ field }) => (
                      <CalendarInputForm
                        selectedDate={field.value}
                        setSelectedDate={field.onChange}
                      />
                    )}></FormController>
                </StDateField>
              </StDateFieldWrapper>
            </StContentWrapper>

            <StContentWrapper>
              <StInputLabel>
                <span>콘텐츠 유형</span>
                <RequiredIcon />
              </StInputLabel>
              <StRadioGroup>
                {CATEGORY_LIST.map((category, index) => (
                  <Radio
                    key={`${index}-${category}`}
                    checked={watch('category') === category}
                    label={category}
                    size="lg"
                    value={category}
                    {...register('category')}
                  />
                ))}
              </StRadioGroup>
            </StContentWrapper>

            <StContentWrapper>
              <StInputLabel>
                <span>노출 위치</span>
                <RequiredIcon />
              </StInputLabel>
              <StRadioGroup>
                {POSITION_LIST.map((position, index) => (
                  <Radio
                    key={`${index}-${position}`}
                    checked={watch('position') === position}
                    label={position}
                    size="lg"
                    value={position}
                    {...register('position')}
                  />
                ))}
              </StRadioGroup>
            </StContentWrapper>

            <BannerImageRegister />
          </StMain>

          <ModalFooter>
            <Button type={'button'} onClick={onClose}>
              취소하기
            </Button>
            <Button type={'submit'} disabled={isSubmitting}>
              등록하기
            </Button>
          </ModalFooter>
        </form>
      </FormProvider>
    </StCreateBannerModalWrapper>
  );
};

export default CreateBannerModal;

export const StCreateBannerModalWrapper = styled.div`
  width: 64rem;

  & main {
    display: flex;
    flex-direction: column;
    gap: 3.2rem;

    padding: 2.6rem 3rem;

    & input {
      display: flex;
      flex-direction: column;
      align-self: stretch;
      background-color: ${colors.gray700};
    }
  }

  & footer {
    display: flex;
    justify-content: flex-end;
    gap: 1.6rem;
  }
`;

const StForm = styled.form``;

const StMain = styled.main`
  max-height: 80rem;
`;

export const StRadioGroup = styled.div`
  display: flex;
  gap: 1.6rem;
`;

export const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray300};
`;

export const StInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  ${fontsObject.LABEL_3_14_SB};
  margin-bottom: 8px;
  color: ${colors.white};

  cursor: pointer;
`;

export const StDescriptionTitle = styled.span`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray100};
`;

const StDateFieldWrapper = styled.div`
  display: flex;
  color: ${colors.gray500};
  gap: 1.2rem;
`;

const StDateField = styled.div`
  width: 100%;
  max-width: 205px;

  @media (max-width: 768px) {
    max-width: 151px;
  }
`;

import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Radio } from '@sopt-makers/ui';
import { Button } from '@sopt-makers/ui';
import { FormProvider, useForm } from 'react-hook-form';

import BannerImageRegister from '@/components/bannerAdmin/BannerImageRegister';
import ContentTypeField from '@/components/bannerAdmin/ContentTypeField';
import DateRangeField from '@/components/bannerAdmin/DateRangeField';
import LinkField from '@/components/bannerAdmin/LinkField';
import LocationFeild from '@/components/bannerAdmin/LocationField';
import PublisherField from '@/components/bannerAdmin/PublisherField';
import {
  bannerSchema,
  BannerType,
  CONTENT_LIST,
  LOCATION_LIST,
} from '@/components/bannerAdmin/types/form';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

interface CreateBannerModalProps {
  onClose: () => void;
}

const CreateBannerModal = ({ onClose }: CreateBannerModalProps) => {
  const method = useForm<BannerType>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      publisher: '',
      contentType: CONTENT_LIST[0],
      location: LOCATION_LIST[0],
      dateRange: [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = method;

  const onSubmit = (data: BannerType) => {
    console.log(data);
  };

  return (
    <StCreateBannerModalWrapper>
      <ModalHeader title="신규 배너 등록" onClose={onClose} />
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StMain>
            <PublisherField />
            <LinkField />
            <DateRangeField />
            <ContentTypeField />
            <LocationFeild />
            <BannerImageRegister />
          </StMain>

          <ModalFooter>
            <Button type={'button'} onClick={onClose}>
              취소하기
            </Button>
            <Button type={'submit'} disabled={isSubmitting || !isValid}>
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

const StMain = styled.main`
  max-height: 50rem;
  overflow-y: scroll;
`;

export const StRadioGroup = styled.div`
  display: flex;
  gap: 1.6rem;
`;

export const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const StDescription = styled.p<{ isError: boolean }>`
  ${fontsObject.LABEL_3_14_SB};
  color: ${({ isError }) => (isError ? colors.error : colors.gray300)};

  & span {
    color: ${({ isError }) => isError && colors.error};
  }
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

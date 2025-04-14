import styled from '@emotion/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Button, Tag, useToast } from '@sopt-makers/ui';
import { useCallback, useEffect, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';

import BannerImageRegister from '@/components/bannerAdmin/BannerImageRegister';
import ContentTypeField from '@/components/bannerAdmin/ContentTypeField';
import DateRangeField from '@/components/bannerAdmin/DateRangeField';
import LinkField from '@/components/bannerAdmin/LinkField';
import LocationFeild from '@/components/bannerAdmin/LocationField';
import PublisherField from '@/components/bannerAdmin/PublisherField';
import {
  BannerFormType,
  bannerSchema,
  CONTENT_VALUE,
  LOCATION_VALUE,
} from '@/components/bannerAdmin/types/form';
import { convertUrlToFile } from '@/components/bannerAdmin/utils/converUrlToFile';
import { getBannerStatus } from '@/components/bannerAdmin/utils/getBannerStatus';
import { getBannerType } from '@/components/bannerAdmin/utils/getBannerType';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { CREATE_MODAL } from '@/pages/bannerAdmin';
import {
  useGetBannerDetail,
  usePostNewBanner,
  usePutBanner,
} from '@/services/api/banner/query';

interface CreateBannerModalProps {
  onCloseModal: () => void;
  modalState: number;
}

const CreateBannerModal = ({
  onCloseModal,
  modalState,
}: CreateBannerModalProps) => {
  const { data: bannerData, isSuccess } = useGetBannerDetail(modalState);
  const { mutate: createBannerMutate } = usePostNewBanner();
  const { mutate: editBannerMutate } = usePutBanner();
  const queryClient = useQueryClient();
  const { open } = useToast();

  // 수정하기 시 서버에서 데이터 받아온 이후 한번만 초기화 하기 위한 ref
  const initialRef = useRef(true);

  const method = useForm<BannerFormType>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      publisher: '',
      contentType: CONTENT_VALUE[0],
      location: LOCATION_VALUE[0],
      dateRange: [],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, isValid, isDirty, errors },
  } = method;

  const resetData = useCallback(async () => {
    if (!isSuccess || modalState === CREATE_MODAL) {
      return;
    }

    const pcImageFile = await convertUrlToFile(bannerData.data.image_url_pc);
    const mobileImageFile = await convertUrlToFile(
      bannerData.data.image_url_mobile,
    );
    const startDate = bannerData.data.start_date.replaceAll('-', '.');
    const endDate = bannerData.data.end_date.replaceAll('-', '.');

    reset({
      publisher: bannerData.data.publisher,
      contentType: bannerData.data.content_type,
      location: bannerData.data.location,
      dateRange: [startDate, endDate],
      link: bannerData.data.link,
      pcImageFileName: {
        file: pcImageFile,
        previewUrl: bannerData.data.image_url_pc,
        location: bannerData.data.location,
      },
      mobileImageFileName: {
        file: mobileImageFile,
        previewUrl: bannerData.data.image_url_mobile,
        location: bannerData.data.location,
      },
    });

    initialRef.current = false;
  }, [bannerData, isSuccess, modalState, reset]);

  useEffect(() => {
    if (initialRef.current && isSuccess) {
      resetData();
    }
  }, [isSuccess, resetData]);

  const onSubmit = (data: BannerFormType) => {
    const bannerData = {
      publisher: data.publisher,
      content_type: data.contentType,
      location: data.location,
      start_date: data.dateRange[0].replaceAll('.', '-'),
      end_date: data.dateRange[1].replaceAll('.', '-'),
      link: data?.link,
      image_pc: data.pcImageFileName.file,
      image_mobile:
        data.location === 'cr_feed'
          ? data.pcImageFileName.file
          : data.mobileImageFileName.file,
    };

    if (modalState === CREATE_MODAL) {
      createBannerMutate(bannerData, {
        onSuccess: () => {
          open({ icon: 'success', content: '배너가 등록되었어요.' });
          onCloseModal();
          queryClient.invalidateQueries('bannerList');
        },
        onError: () => {
          open({ icon: 'error', content: '배너 등록에 실패했어요.' });
        },
      });

      return;
    }

    editBannerMutate(
      { bannerId: modalState, bannerData },
      {
        onSuccess: () => {
          open({ icon: 'success', content: '배너가 수정되었어요.' });
          onCloseModal();
          queryClient.invalidateQueries('bannerList');
        },
        onError: () => {
          open({ icon: 'error', content: '배너 수정에 실패했어요.' });
        },
      },
    );
  };

  return (
    <StCreateBannerModalWrapper>
      <ModalHeader
        title={modalState === CREATE_MODAL ? '신규 배너 등록' : '배너 수정'}
        onClose={onCloseModal}
        tag={
          modalState !== CREATE_MODAL && (
            <Tag
              size="lg"
              variant={getBannerType(bannerData?.data.status as BANNER_STATUS)}>
              {getBannerStatus(bannerData?.data.status as BANNER_STATUS)}
            </Tag>
          )
        }
      />
      <FormProvider {...method}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <StMain>
            <PublisherField />
            <LinkField />
            <DateRangeField />
            <ContentTypeField />
            <LocationFeild modalState={modalState} />
            <BannerImageRegister />
          </StMain>

          <ModalFooter>
            <Button type={'button'} onClick={onCloseModal}>
              취소하기
            </Button>
            {modalState === CREATE_MODAL ? (
              <Button type={'submit'} disabled={isSubmitting || !isValid}>
                등록하기
              </Button>
            ) : (
              <Button
                type={'submit'}
                disabled={isSubmitting || !isValid || !isDirty}>
                수정하기
              </Button>
            )}
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

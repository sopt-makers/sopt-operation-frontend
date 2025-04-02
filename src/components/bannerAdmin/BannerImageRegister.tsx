import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IcModalClose } from '@/assets/icons';
import {
  StContentWrapper,
  StDescription,
  StInputLabel,
} from '@/components/bannerAdmin/CreateBannerModal';
import ImageDropZone from '@/components/bannerAdmin/ImageDropZone';
import {
  getMoImageBaseSize,
  getPcImageBaseSize,
} from '@/components/bannerAdmin/types/form';
import Modal from '@/components/common/modal';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

const BannerImageRegister = () => {
  const method = useFormContext();
  const { errors } = method.formState;

  const { getValues } = method;
  const location = getValues('location');

  const [isModalOpen, setIsModalOpen] = useState<'pc' | 'mobile' | null>(null);

  const [pcImageBaseWidth, pcImageBaseHeight] = getPcImageBaseSize(location);
  const [moImageBaseWidth, moImageBaseHeight] = getMoImageBaseSize(location);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  return (
    <StContentWrapper>
      <StInputLabel>
        <span>이미지 등록</span>
        <RequiredIcon />
      </StInputLabel>

      <StDescriptionWrapper>
        <StDescription isError={errors.pcImageFileName ? true : false}>
          <StDescriptionTitle>
            {location === '모임피드' ? '[PC/MO]' : '[PC]'}
          </StDescriptionTitle>{' '}
          {`이미지는 ${pcImageBaseWidth}*${pcImageBaseHeight} px`}
          크기로 올려주세요.
          <p>(형식: PNG, 용량: 5MB 이내)</p>
        </StDescription>
        <Button
          size="sm"
          variant="outlined"
          disabled={
            !getValues('pcImageFileName') || 'pcImageFileName' in errors
          }
          onClick={() => setIsModalOpen('pc')}>
          미리보기
        </Button>
      </StDescriptionWrapper>
      <ImageDropZone
        method={method}
        label="pcImageFileName"
        width="58rem"
        height="17rem"
        required
      />

      {location !== '모임피드' && (
        <>
          <StDescriptionWrapper style={{ marginTop: '2rem' }}>
            <StDescription isError={!!errors.mobileImageFileName}>
              <StDescriptionTitle>[PC]</StDescriptionTitle>{' '}
              {`이미지는 ${moImageBaseWidth}*${moImageBaseHeight} px`}
              크기로 올려주세요.
              <p>(형식: PNG, 용량: 5MB 이내)</p>
            </StDescription>
            <Button
              size="sm"
              variant="outlined"
              disabled={
                !getValues('mobileImageFileName') ||
                'mobileImageFileName' in errors
              }
              onClick={() => setIsModalOpen('mobile')}>
              미리보기
            </Button>
          </StDescriptionWrapper>
          <ImageDropZone
            method={method}
            label="mobileImageFileName"
            width="580px"
            height="170px"
          />
        </>
      )}

      {isModalOpen && (
        <Modal>
          <StPreviewWrapper>
            <StModalCloseIcon onClick={() => setIsModalOpen(null)} />

            {isModalOpen && isModalOpen === 'pc' ? (
              // eslint-disable-next-line @next/next/no-img-element
              <StPreviewImage
                src={getValues('pcImageFileName').previewUrl}
                alt="pc 배너 미리보기"
                viewportWidth={viewportWidth}
                viewportHeight={viewportHeight}
              />
            ) : (
              <StPreviewImage
                src={getValues('mobileImageFileName').previewUrl}
                alt="mobile 배너 미리보기"
                viewportWidth={viewportWidth}
                viewportHeight={viewportHeight}
              />
            )}
          </StPreviewWrapper>
        </Modal>
      )}
    </StContentWrapper>
  );
};

export default BannerImageRegister;

const StDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StPreviewWrapper = styled.div`
  position: 'relative';
`;

const StPreviewImage = styled.img<{
  viewportWidth: number;
  viewportHeight: number;
}>`
  max-width: ${({ viewportWidth }) => `calc(${viewportWidth}px - 288px)`};
  max-height: ${({ viewportHeight }) => `calc(${viewportHeight}px - 100px)`};
`;

const StDescriptionTitle = styled.span`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray100};
`;

export const StModalCloseIcon = styled(IcModalClose)`
  position: absolute;
  top: -4rem;
  right: 0;

  width: 2.4rem;
  height: 2.4rem;
`;

import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { IcModalClose } from '@/assets/icons';
import {
  StContentWrapper,
  StDescription,
  StDescriptionTitle,
  StInputLabel,
} from '@/components/bannerAdmin/CreateBannerModal';
import ImageDropZone from '@/components/bannerAdmin/ImageDropZone';
import Modal from '@/components/common/modal';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

const BannerImageRegister = () => {
  const method = useFormContext();
  const { errors } = method.formState;

  const { getValues } = method;

  const [isModalOpen, setIsModalOpen] = useState<'pc' | 'mobile' | null>(null);

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

  return (
    <StContentWrapper>
      <StInputLabel>
        <span>이미지 등록</span>
        <RequiredIcon />
      </StInputLabel>

      <StDescriptionWrapper>
        <StDescription isError={errors.pcImageFileName ? true : false}>
          <StDescriptionTitle>[PC]</StDescriptionTitle> 이미지는 1824*328 px
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
        width="580px"
        height="170px"
        required
      />

      <StDescriptionWrapper style={{ marginTop: '2rem' }}>
        <StDescription isError={errors.mobileImageFileName ? true : false}>
          <StDescriptionTitle>[PC]</StDescriptionTitle> 이미지는 1340*627 px
          크기로 올려주세요.
          <p>(형식: PNG, 용량: 5MB 이내)</p>
        </StDescription>
        <Button
          size="sm"
          variant="outlined"
          disabled={
            !getValues('mobileImageFileName') || 'mobileImageFileName' in errors
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

      {isModalOpen && (
        <Modal>
          <StPreviewWrapper>
            <IcModalClose
              width={24}
              height={24}
              onClick={() => setIsModalOpen(null)}
              style={{ position: 'absolute', top: '-4rem', right: 0 }}
            />
            {isModalOpen && isModalOpen === 'pc' ? (
              <Image
                src={getValues('pcImageFileName').previewUrl}
                alt="pc 배너 미리보기"
                width={1824}
                height={328}
              />
            ) : (
              <Image
                src={getValues('mobileImageFileName').previewUrl}
                alt="mobile 배너 미리보기"
                width={1340}
                height={672}
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

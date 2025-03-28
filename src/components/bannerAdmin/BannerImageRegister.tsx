import styled from '@emotion/styled';
import { Button } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StContentWrapper,
  StDescription,
  StDescriptionTitle,
  StInputLabel,
} from '@/components/bannerAdmin/CreateBannerModal';
import ImageDropZone from '@/components/bannerAdmin/ImageDropZone';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

const BannerImageRegister = () => {
  const method = useFormContext();
  const { errors } = method.formState;

  const { getValues } = method;
  console.log(errors);
  return (
    <StContentWrapper>
      <StInputLabel>
        <span>이미지 등록</span>
        <RequiredIcon />
      </StInputLabel>

      <StDescriptionWrapper>
        <StDescription>
          <StDescriptionTitle>[PC]</StDescriptionTitle> 이미지는 1824*328 px
          크기로 올려주세요.
          <p>(형식: PNG, 용량: 5MB 이내)</p>
        </StDescription>
        <Button
          size="sm"
          variant="outlined"
          disabled={
            !getValues('pcImageFileName') || 'pcImageFileName' in errors
          }>
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
        <StDescription>
          <StDescriptionTitle>[PC]</StDescriptionTitle> 이미지는 1824*328 px
          크기로 올려주세요.
          <p>(형식: PNG, 용량: 5MB 이내)</p>
        </StDescription>
        <Button
          size="sm"
          variant="outlined"
          disabled={
            !getValues('mobileImageFileName') || 'mobileImageFileName' in errors
          }>
          미리보기
        </Button>
      </StDescriptionWrapper>
      <ImageDropZone
        method={method}
        label="mobileImageFileName"
        width="580px"
        height="170px"
      />
    </StContentWrapper>
  );
};

export default BannerImageRegister;

const StDescriptionWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

import { useFormContext } from 'react-hook-form';

import {
  CustomTextField,
  StDescription,
  StDescriptionWrapper,
  StInputLabel,
} from '@/components/bannerAdmin/CreateBannerModal';
import Input from '@/components/common/Input';

const LinkField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <CustomTextField
        id="link"
        labelText="[선택] 링크 첨부"
        placeholder="이동할 링크를 입력하세요."
        isError={!!errors.link}
        {...register('link')}
      />
      <StDescriptionWrapper>
        <StDescription isError={!!errors.link}>
          {errors.link?.message as string}
        </StDescription>
      </StDescriptionWrapper>
    </div>
  );
};

export default LinkField;

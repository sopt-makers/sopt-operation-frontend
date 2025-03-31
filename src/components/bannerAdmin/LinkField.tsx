import { TextField } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StDescription,
  StDescriptionWrapper,
} from '@/components/bannerAdmin/CreateBannerModal';

const LinkField = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <TextField
        id="link"
        labelText="[선택] 링크 첨부"
        placeholder="이동할 링크를 입력하세요."
        {...register('link')}
        isError={errors.link ? true : false}
      />
      <StDescriptionWrapper>
        <StDescription isError={errors.link ? true : false}>
          {errors.link?.message as string}
        </StDescription>
      </StDescriptionWrapper>
    </div>
  );
};

export default LinkField;

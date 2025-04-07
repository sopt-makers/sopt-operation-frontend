import { TextField } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StDescription,
  StDescriptionWrapper,
} from '@/components/bannerAdmin/CreateBannerModal';

const MAX_PUBLISHER_LENGTH = 30;

const PublisherField = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <div>
      <TextField
        id="publisher"
        labelText="광고 요청자"
        placeholder="광고 요청자 이름을 입력하세요."
        required={true}
        maxLength={30}
        {...register('publisher')}
      />
      <StDescriptionWrapper>
        <StDescription isError={!!errors.publisher}>
          {errors.publisher?.message as string}
        </StDescription>
        <StDescription
          isError={
            !!errors.publisher
          }>{`${watch('publisher').length}/${MAX_PUBLISHER_LENGTH}`}</StDescription>
      </StDescriptionWrapper>
    </div>
  );
};

export default PublisherField;

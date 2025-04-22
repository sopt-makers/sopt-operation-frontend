import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { TextField } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StDescription,
  StDescriptionWrapper,
} from '@/components/bannerAdmin/CreateBannerModal';
import FormController from '@/components/bannerAdmin/form/FormController';

const MAX_PUBLISHER_LENGTH = 30;

const PublisherField = () => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <div>
      <FormController
        name="publisher"
        defaultValue=""
        render={({ field }) => (
          <CustomInputWrapper>
            <TextField
              labelText="광고 요청자"
              placeholder="광고 요청자 이름을 입력하세요."
              required={true}
              maxLength={30}
              {...field}
            />
          </CustomInputWrapper>
        )}
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

const CustomInputWrapper = styled.div`
  & input {
    background-color: ${colors.gray700};
  }

  & > div > div:has(input) {
    background-color: ${colors.gray700};
  }
`;

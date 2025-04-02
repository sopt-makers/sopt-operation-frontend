import { Radio } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StContentWrapper,
  StInputLabel,
  StRadioGroup,
} from '@/components/bannerAdmin/CreateBannerModal';
import { CONTENT_LIST } from '@/components/bannerAdmin/types/form';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

const ContentTypeField = () => {
  const { register, watch } = useFormContext();

  return (
    <StContentWrapper>
      <StInputLabel>
        <span>콘텐츠 유형</span>
        <RequiredIcon />
      </StInputLabel>
      <StRadioGroup>
        {CONTENT_LIST.map((content, index) => (
          <Radio
            key={`${index}-${content}`}
            checked={watch('contentType') === content}
            label={content}
            size="lg"
            value={content}
            {...register('contentType')}
          />
        ))}
      </StRadioGroup>
    </StContentWrapper>
  );
};

export default ContentTypeField;

import { Radio } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StContentWrapper,
  StInputLabel,
  StRadioGroup,
} from '@/components/bannerAdmin/CreateBannerModal';
import { CONTENT_KEY, contentList } from '@/components/bannerAdmin/types/form';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import FormController from '@/components/bannerAdmin/form/FormController';

const ContentTypeField = () => {
  const { watch } = useFormContext();

  const content = watch('contentType');

  return (
    <StContentWrapper>
      <StInputLabel>
        <span>콘텐츠 유형</span>
        <RequiredIcon />
      </StInputLabel>
      <StRadioGroup>
        {CONTENT_KEY.map((contentItem, index) => (
          <FormController
            key={`${index}-${contentItem}`}
            name="contentType"
            render={({ field }) => (
              <Radio
                {...field}
                label={contentItem}
                size="lg"
                value={contentList[contentItem]}
                checked={content === contentList[contentItem]}
              />
            )}
          />
        ))}
      </StRadioGroup>
    </StContentWrapper>
  );
};

export default ContentTypeField;

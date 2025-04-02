import { Radio } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import {
  StContentWrapper,
  StInputLabel,
  StRadioGroup,
} from '@/components/bannerAdmin/CreateBannerModal';
import {
  LOCATION_KEY,
  locationList,
} from '@/components/bannerAdmin/types/form';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';

const LocationField = () => {
  const { register, watch } = useFormContext();

  return (
    <StContentWrapper>
      <StInputLabel>
        <span>노출 위치</span>
        <RequiredIcon />
      </StInputLabel>
      <StRadioGroup>
        {LOCATION_KEY.map((location, index) => (
          <Radio
            key={`${index}-${location}`}
            checked={watch('location') === locationList[location]}
            label={location}
            size="lg"
            value={locationList[location]}
            {...register('location')}
          />
        ))}
      </StRadioGroup>
    </StContentWrapper>
  );
};

export default LocationField;

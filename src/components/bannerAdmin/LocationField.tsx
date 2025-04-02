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
import { useEffect } from 'react';

import FormController from '@/components/bannerAdmin/form/FormController';

const LocationField = () => {
  const { watch, trigger, setValue } = useFormContext();

  const location = watch('location');

  useEffect(() => {
    setValue('pcImageFileName.location', location);
    setValue('mobileImageFileName.location', location);
    trigger('pcImageFileName');
    trigger('mobileImageFileName');
  }, [location]);

  return (
    <StContentWrapper>
      <StInputLabel>
        <span>노출 위치</span>
        <RequiredIcon />
      </StInputLabel>
      <StRadioGroup>
        {LOCATION_KEY.map((locationItem, index) => (
          <FormController
            key={`${index}-${locationItem}`}
            name="location"
            render={({ field }) => (
              <Radio
                {...field}
                label={locationItem}
                size="lg"
                value={locationList[locationItem]}
                checked={location === locationList[locationItem]}
              />
            )}
          />
        ))}
      </StRadioGroup>
    </StContentWrapper>
  );
};

export default LocationField;

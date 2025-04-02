import { Radio } from '@sopt-makers/ui';
import { Controller, useFormContext } from 'react-hook-form';

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
import { CREATE_MODAL } from '@/pages/bannerAdmin';
import FormController from '@/components/bannerAdmin/form/FormController';

interface LocationField {
  modalState: number;
}

const LocationField = ({ modalState }: LocationField) => {
  const {
    register,
    getValues,
    watch,
    trigger,
    setValue,
    getFieldState,
    formState: { defaultValues },
  } = useFormContext();

  const location = watch('location');
  const locationState = getFieldState('location');
  console.log(defaultValues);

  useEffect(() => {
    setValue('pcImageFileName.location', location);
    setValue('mobileImageFileName.location', location);
    trigger('pcImageFileName');
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

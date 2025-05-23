import { Radio } from '@sopt-makers/ui';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  StContentWrapper,
  StInputLabel,
  StRadioGroup,
} from '@/components/bannerAdmin/CreateBannerModal';
import FormController from '@/components/bannerAdmin/form/FormController';
import {
  LOCATION_KEY,
  locationList,
} from '@/components/bannerAdmin/types/form';
import RequiredIcon from '@/components/org/OrgAdmin/assets/RequiredIcon';
import { CREATE_MODAL } from '@/pages/bannerAdmin';

interface LocationField {
  modalState: number;
}
const LocationField = ({ modalState }: LocationField) => {
  const { watch, trigger, setValue, getValues } = useFormContext();

  const location = watch('location');
  const pcImageFile = getValues('pcImageFileName');
  const mobileImageFile = getValues('mobileImageFileName');

  useEffect(() => {
    if (modalState === CREATE_MODAL) {
      if (!!pcImageFile?.file && !!mobileImageFile?.file) {
        setValue('pcImageFileName.location', location);
        trigger('pcImageFileName');
        setValue('mobileImageFileName.location', location);
        trigger('mobileImageFileName');
      } else if (!pcImageFile?.file && !!mobileImageFile?.file) {
        setValue('pcImageFileName.location', location);
        setValue('mobileImageFileName.location', location);
        trigger('mobileImageFileName');
      } else if (!!pcImageFile?.file && !mobileImageFile?.file) {
        setValue('pcImageFileName.location', location);
        trigger('pcImageFileName');
        setValue('mobileImageFileName.location', location);
      } else {
        setValue('pcImageFileName.location', location);
        setValue('mobileImageFileName.location', location);
      }
    } else {
      setValue('pcImageFileName.location', location);
      setValue('mobileImageFileName.location', location);
      trigger('pcImageFileName');
      trigger('mobileImageFileName');
    }
  }, [
    location,
    mobileImageFile?.file,
    modalState,
    pcImageFile?.file,
    setValue,
    trigger,
  ]);

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

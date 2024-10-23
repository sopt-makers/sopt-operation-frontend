import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import { ORG_ADMIN_LIST } from '@/utils/org';

import SubmitIcon from './assets/SubmitIcon';
import CommonSection from './CommonSection';
import { StSubmitButton, StSubmitText } from './style';

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');
  const methods = useForm({ mode: 'onBlur' });
  const { handleSubmit } = methods;

  const onChangePart = (part: ORG_ADMIN): void => {
    setSelectedPart(part);
  };

  return (
    <>
      <StListHeader>
        <h1>공홈 관리</h1>
        <FilterButton
          list={ORG_ADMIN_LIST}
          selected={selectedPart}
          onChange={onChangePart}
        />
      </StListHeader>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit((data) => {})}>
          <CommonSection />
          <StSubmitButton>
            <SubmitIcon />
            <StSubmitText>배포</StSubmitText>
          </StSubmitButton>
        </form>
      </FormProvider>
    </>
  );
}

export default OrgAdmin;

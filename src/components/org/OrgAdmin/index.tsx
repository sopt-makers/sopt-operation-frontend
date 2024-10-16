import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import { orgAdminList } from '@/utils/translator';

import CommonSection from './CommonSection';

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
          list={orgAdminList}
          selected={selectedPart}
          onChange={onChangePart}
        />
      </StListHeader>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(() => {})}>
          <CommonSection />
        </form>
      </FormProvider>
    </>
  );
}

export default OrgAdmin;

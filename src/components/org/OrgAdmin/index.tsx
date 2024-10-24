import { useState } from 'react';

import { StListHeader } from '@/components/attendanceAdmin/session/SessionList/style';
import FilterButton from '@/components/common/FilterButton';
import HomeSection from '@/components/org/OrgAdmin/home/HomeSection';
import { orgAdminList } from '@/utils/org';

function OrgAdmin() {
  const [selectedPart, setSelectedPart] = useState<ORG_ADMIN>('공통');

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
        {selectedPart === '홈' && <HomeSection />}
      </StListHeader>
    </>
  );
}

export default OrgAdmin;

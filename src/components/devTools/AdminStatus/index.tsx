import { useContext, useState } from 'react';

import DropDown from '@/components/common/DropDown';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';

import { adminStatusContext } from '../AdminContextProvider';
import { StAdminStatusContainer } from './style';

function AdminStatusDevtools() {
  const { status, setStatus } = useContext(adminStatusContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const STATUS_SELECTION: ADMIN_STATUS[] = [
    'SOPT',
    'MAKERS',
    'DEVELOPER',
    'NOT_CERTIFIED',
  ];

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
  };

  return (
    <StAdminStatusContainer>
      <OptionTemplate title="권한">
        <Selector
          content={status}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
        {isDropdownOpen && (
          <DropDown
            type={'select'}
            list={STATUS_SELECTION}
            onItemSelected={handleStatusChange}
          />
        )}
      </OptionTemplate>
    </StAdminStatusContainer>
  );
}

export default AdminStatusDevtools;

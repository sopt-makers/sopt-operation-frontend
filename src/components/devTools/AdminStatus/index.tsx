import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import DropDown from '@/components/common/DropDown';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';

import { adminStatusContext } from '../AdminContextProvider';
import { StAdminStatusContainer } from './style';

function AdminStatusDevtools() {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { status, setStatus } = useContext(adminStatusContext);

  const STATUS_SELECTION: ADMIN_STATUS[] = ['SOPT', 'MAKERS'];

  const isAdminStatus = (value: string): value is ADMIN_STATUS => {
    return [
      'SUPER_USER',
      'SOPT',
      'MAKERS',
      'NOT_CERTIFIED',
      'DEVELOPER',
    ].includes(value);
  };

  const handleStatusChange = (newStatus: string) => {
    if (isAdminStatus(newStatus)) {
      setStatus(newStatus);
      sessionStorage.setItem('adminStatus', newStatus);
      if (newStatus === 'MAKERS') {
        router.push('/alarmAdmin');
      }
    } else {
      console.error('유효하지 않은 권한입니다.');
    }
  };

  useEffect(() => {
    console.log('현재 계정 권한:', status);
  }, [status]);

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

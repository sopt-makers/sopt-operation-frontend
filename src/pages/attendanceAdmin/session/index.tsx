import { useState } from 'react';

import SessionList from '@/components/attendanceAdmin/session/SessionList';
import SessionListFooter from '@/components/attendanceAdmin/session/SessionListFooter';
import Footer from '@/components/common/Footer';

function SessionPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      <SessionList />
      <Footer>
        <SessionListFooter onClick={() => setIsModalOpen(!isModalOpen)} />
      </Footer>
    </>
  );
}

export default SessionPage;

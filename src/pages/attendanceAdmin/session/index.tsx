import { useEffect, useState } from 'react';

import CreateSessionModal from '@/components/attendanceAdmin/createSessionModal';
import SessionList from '@/components/attendanceAdmin/session/SessionList';
import SessionListFooter from '@/components/attendanceAdmin/session/SessionListFooter';
import Footer from '@/components/common/Footer';
import Modal from '@/components/common/Modal';
function SessionPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      {isModalOpen && (
        <Modal>
          <CreateSessionModal onClose={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      )}
      <SessionList />
      <Footer>
        <SessionListFooter onClick={() => setIsModalOpen(!isModalOpen)} />
      </Footer>
    </>
  );
}

export default SessionPage;

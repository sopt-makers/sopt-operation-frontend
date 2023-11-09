import { useEffect, useState } from 'react';

import CreateSessionModal from '@/components/attendanceAdmin/session/CreateSessionModal';
import SessionList from '@/components/attendanceAdmin/session/SessionList';
import SessionListFooter from '@/components/attendanceAdmin/session/SessionListFooter';
import FloatingButton from '@/components/common/FloatingButton';
import Footer from '@/components/common/Footer';
import Modal from '@/components/common/modal';
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
      <FloatingButton
        content={<>세션 생성하기</>}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
}

export default SessionPage;

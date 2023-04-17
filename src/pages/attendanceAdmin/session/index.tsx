import { useState } from 'react';
import SessionList from '@/components/attendanceAdmin/session/SessionList';
import SessionListFooter from '@/components/attendanceAdmin/session/SessionListFooter';
import Footer from '@/components/common/Footer';
import CreateSessionModal from '@/components/attendanceAdmin/createSessionModal';
import Modal from '@/components/common/Modal';
function SessionPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <>
      {isModalOpen && (
        <Modal>
          <CreateSessionModal onClose={toggleModal} />
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

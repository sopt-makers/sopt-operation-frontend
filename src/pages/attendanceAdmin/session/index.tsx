import { useState } from 'react';

import CreateSessionModal from '@/components/attendanceAdmin/createSessionModal';
import Footer from '@/components/common/Footer';
import Modal from '@/components/common/Modal';

function SessionPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      {isModalOpen && (
        <Modal>
          <CreateSessionModal onClose={toggleModal} />
        </Modal>
      )}
      <Footer>
        <></>
      </Footer>
      <button onClick={toggleModal}>내가 모달을 나타나게 해볼게 얍</button>
    </>
  );
}

export default SessionPage;

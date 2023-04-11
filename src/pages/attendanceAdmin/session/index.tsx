import CreateSessionModal from '@/components/attendanceAdmin/createSessionModal';
import Footer from '@/components/common/Footer';
import Modal from '@/components/common/Modal';

function SessionPage() {
  return (
    <>
      <Footer>
        <Modal>
          <CreateSessionModal />
        </Modal>
        <></>
      </Footer>
    </>
  );
}

export default SessionPage;

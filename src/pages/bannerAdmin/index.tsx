import { useEffect, useState } from 'react';

import SessionList from '@/components/attendanceAdmin/session/SessionList';
import CreateBannerModal from '@/components/bannerAdmin/CreateBannerModal';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';

const BannerAdminPage = () => {
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
          <CreateBannerModal onClose={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      )}
      <SessionList />
      <FloatingButton
        content={<>배너 등록</>}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
    </>
  );
};

export default BannerAdminPage;

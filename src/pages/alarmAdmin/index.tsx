import { useState } from 'react';

import CreateAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import Button from '@/components/common/Button';
import Modal from '@/components/common/modal';

function AlarmAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        type={'button'}
        text="모달 열기"
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      {isModalOpen && (
        <Modal>
          <CreateAlarmModal onClose={() => setIsModalOpen(!isModalOpen)} />
        </Modal>
      )}
    </>
  );
}

export default AlarmAdminPage;

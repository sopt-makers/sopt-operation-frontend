import { useState } from 'react';

import AlarmList from '@/components/alarmAdmin/AlarmList';
import CreateAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';

function AlarmAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <AlarmList />
      <FloatingButton
        content={<>알림 생성하기</>}
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

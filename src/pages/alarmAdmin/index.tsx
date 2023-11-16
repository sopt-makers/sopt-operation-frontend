import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import AlarmList from '@/components/alarmAdmin/AlarmList';
import CreateAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import FloatingButton from '@/components/common/FloatingButton';
import Modal from '@/components/common/modal';
import { currentGenerationState } from '@/recoil/atom';
import { useGetAlarmList } from '@/services/api/alarm/query';

function AlarmAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentGeneration = useRecoilValue(currentGenerationState);

  const alarmListData = useGetAlarmList(parseInt(currentGeneration));

  const handleModalClose = () => {
    setIsModalOpen(!isModalOpen);
    alarmListData.refetch();
  };

  return (
    <>
      <AlarmList alarmListData={alarmListData} />
      <FloatingButton
        content={<>알림 생성하기</>}
        onClick={() => setIsModalOpen(!isModalOpen)}
      />
      {isModalOpen && (
        <Modal>
          <CreateAlarmModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}

export default AlarmAdminPage;

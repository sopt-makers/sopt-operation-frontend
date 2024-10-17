import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import AlarmList from '@/components/alarmAdmin/AlarmList';
import CreateAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import FloatingButton from '@/components/common/FloatingButton';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { currentGenerationState } from '@/recoil/atom';
import { useGetAlarmList } from '@/services/api/alarm/query';

function AlarmAdminPage() {
  const currentGeneration = useRecoilValue(currentGenerationState);

  const [tab, setTab] = useState<ALARM_STATUS>('ALL');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, refetch } = useGetAlarmList(
    parseInt(currentGeneration),
    tab,
  );

  const handleModalClose = async () => {
    setIsModalOpen(!isModalOpen);
    refetch();
  };

  const handleChangeTab = (value: ALARM_STATUS) => {
    setTab(value);
  };

  if (isLoading || !data) return <Loading />;
  return (
    <>
      <AlarmList
        alarmList={data.alarms}
        totalCount={data.totalCount}
        tab={tab}
        refetch={refetch}
        onChangeTab={handleChangeTab}
      />
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

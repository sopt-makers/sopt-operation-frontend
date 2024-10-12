import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import AlarmList from '@/components/alarmAdmin/AlarmList';
import CreateNewAlarmModal from '@/components/alarmAdmin/CreateNewAlarmModal';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { currentGenerationState } from '@/recoil/atom';
import { useGetAlarmList } from '@/services/api/alarm/query';

import {
  IconArrowUpRight,
  IconClock,
  IconPlus,
  IconXClose,
} from '@sopt-makers/icons';
import {
  AlarmOptionButton,
  AlarmOptionButtonList,
  AlarmOptionButtonListBackground,
  FloatingButton,
  IconWrapper,
} from './style';

function AlarmAdminPage() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAlarmOptionButtonListOpen, setIsAlarmOptionButtonListOpen] =
    useState<boolean>(false);
  const [selectedSendType, setSelectedSendType] = useState<
    'NOW' | 'RESERVE' | null
  >();

  const currentGeneration = useRecoilValue(currentGenerationState);

  const { data, isLoading, refetch } = useGetAlarmList(
    parseInt(currentGeneration),
  );

  const handleModalClose = async () => {
    setIsModalOpen(!isModalOpen);
    setSelectedSendType(null);
    setIsAlarmOptionButtonListOpen(false);
    refetch();
  };

  const refetchAlarmList = () => {
    refetch();
  };

  const handleClickAlarmOptionButton = (sendType: 'NOW' | 'RESERVE') => {
    setSelectedSendType(sendType);
  };

  if (isLoading || !data) return <Loading />;
  return (
    <>
      <AlarmList data={data} refetch={refetchAlarmList} />
      <FloatingButton
        isAlarmOptionButtonListOpen={isAlarmOptionButtonListOpen}
        onClick={() =>
          setIsAlarmOptionButtonListOpen(!isAlarmOptionButtonListOpen)
        }>
        <IconWrapper>
          {isAlarmOptionButtonListOpen ? <IconXClose /> : <IconPlus />}
        </IconWrapper>
        <span>알림 생성하기</span>
      </FloatingButton>
      {isAlarmOptionButtonListOpen && (
        <AlarmOptionButtonListBackground>
          <AlarmOptionButtonList>
            <AlarmOptionButton
              isSelected={selectedSendType === 'NOW'}
              onClick={() => handleClickAlarmOptionButton('NOW')}>
              <IconWrapper>
                <IconArrowUpRight />
              </IconWrapper>
              <span>즉시 발송</span>
            </AlarmOptionButton>
            <AlarmOptionButton
              isSelected={selectedSendType === 'RESERVE'}
              onClick={() => handleClickAlarmOptionButton('RESERVE')}>
              <IconWrapper>
                <IconClock />
              </IconWrapper>
              <span>예약 발송</span>
            </AlarmOptionButton>
          </AlarmOptionButtonList>
        </AlarmOptionButtonListBackground>
      )}
      {selectedSendType === 'NOW' && (
        <Modal>
          <CreateNewAlarmModal sendType="NOW" onClose={handleModalClose} />
        </Modal>
      )}
      {selectedSendType === 'RESERVE' && (
        <Modal>
          <CreateNewAlarmModal sendType="RESERVE" onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}

export default AlarmAdminPage;

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import {
  IconArrowUpRight,
  IconClock,
  IconPlus,
  IconXClose,
} from '@sopt-makers/icons';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import AlarmList from '@/components/alarmAdmin/AlarmList';
import CreateNewAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import CreateAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { currentGenerationState } from '@/recoil/atom';
import { useGetAlarmList } from '@/services/api/alarm/query';

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
          <CreateAlarmModal sendType="NOW" onClose={handleModalClose} />
        </Modal>
      )}
      {selectedSendType === 'RESERVE' && (
        <Modal>
          <CreateAlarmModal sendType="RESERVE" onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}

export default AlarmAdminPage;

const FloatingButton = styled.button<{
  isAlarmOptionButtonListOpen: boolean;
}>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  right: 6rem;
  bottom: 6rem;
  width: 16rem;
  height: 5.6rem;
  border-radius: 18px;
  z-index: 12;
  background-color: ${({ isAlarmOptionButtonListOpen }) =>
    isAlarmOptionButtonListOpen ? colors.gray500 : colors.white};
  color: ${({ isAlarmOptionButtonListOpen }) =>
    isAlarmOptionButtonListOpen ? colors.white : colors.black};
  ${fontsObject.HEADING_6_18_B}
`;

const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;

const AlarmOptionButtonListBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 15, 18, 0.8);
  z-index: 11;
`;

const AlarmOptionButtonList = styled.ul`
  position: fixed;
  right: 6rem;
  bottom: 13.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 16rem;
  height: 12.8rem;
  padding: 0.6rem;
  border-radius: 18px;
  background-color: ${colors.white};
  z-index: 1;
`;

const AlarmOptionButton = styled.button<{
  isSelected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
  height: 5.6rem;

  border-radius: 12px;

  ${fontsObject.HEADING_6_18_B}

  background-color: ${({ isSelected }) =>
    isSelected ? colors.gray100 : colors.white};

  &:hover {
    background-color: ${colors.gray100};
  }
`;

import { css } from '@emotion/react';
import { IconArrowUpRight, IconClock, IconPlus } from '@sopt-makers/icons';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import AlarmList from '@/components/alarmAdmin/AlarmList';
import CreateAlarmModal from '@/components/alarmAdmin/CreateAlarmModal';
import FloatingButton from '@/components/common/FloatingButton';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { currentGenerationState } from '@/recoil/atom';
import { useGetAlarmList } from '@/services/api/alarm/query';
import zIndex from '@/utils/zIndex';

function AlarmAdminPage() {
  const [isSendTypeSelectorOpen, setIsSendTypeSelectorOpen] =
    useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const currentGeneration = useRecoilValue(currentGenerationState);

  const { data, isLoading, refetch } = useGetAlarmList(
    parseInt(currentGeneration),
  );

  const handleModalClose = async () => {
    setIsModalOpen(!isModalOpen);
    refetch();
  };

  const refetchAlarmList = () => {
    refetch();
  };

  if (isLoading || !data) return <Loading />;
  return (
    <>
      <AlarmList data={data} refetch={refetchAlarmList} />
      <section css={floatingButtonsCss}>
        {isSendTypeSelectorOpen && (
          <article
            css={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',

              '& > button': { width: '100%' },
            }}>
            <Button
              size="md"
              LeftIcon={IconArrowUpRight}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
                setIsSendTypeSelectorOpen(false);
              }}>
              즉시 발송
            </Button>
            <Button
              size="md"
              LeftIcon={IconClock}
              onClick={() => {
                setIsModalOpen(!isModalOpen);
                setIsSendTypeSelectorOpen(false);
              }}>
              예약 발송
            </Button>
          </article>
        )}
        <Button
          size="md"
          LeftIcon={IconPlus}
          onClick={() => setIsSendTypeSelectorOpen((prev) => !prev)}>
          알림 생성하기
        </Button>
      </section>

      {isModalOpen && (
        <Modal>
          <CreateAlarmModal onClose={handleModalClose} />
        </Modal>
      )}
    </>
  );
}

export default AlarmAdminPage;

const floatingButtonsCss = css({
  position: 'fixed',
  right: '60px',
  bottom: '60px',

  display: 'flex',
  flexDirection: 'column',
  gap: '20px',

  zIndex: zIndex.footer,
});

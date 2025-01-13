import { Tag } from '@sopt-makers/ui';
import { Tab } from '@sopt-makers/ui';
import dayjs from 'dayjs';
import { useState } from 'react';

import IcMore from '@/assets/icons/IcMore.svg';
import { StActionButton } from '@/components/attendanceAdmin/session/SessionList/style';
import ListWrapper from '@/components/common/ListWrapper';
import Modal from '@/components/common/modal';
import { deleteAlarm } from '@/services/api/alarm';
import { ALARM_STATUS_LIST } from '@/utils/alarm';
import { alarmStatusTranslator } from '@/utils/translator';

import ShowAlarmModal from '../ShowAlarmModal';
import { StListItem, StPageHeader } from './style';

interface Props {
  alarmList: Alarm[];
  totalCount: number;
  tab: ALARM_STATUS;
  refetch: () => void;
  onChangeTab: (value: ALARM_STATUS) => void;
}

function AlarmList(props: Props) {
  const { alarmList, totalCount, tab, refetch, onChangeTab } = props;

  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [showAlarmDetail, setShowAlarmDetail] = useState<number | null>(null);

  const toggleDropdown = (e: React.MouseEvent, alarmId: number): void => {
    e.stopPropagation();
    if (activeDropdownId === alarmId) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(alarmId);
    }
  };

  const handleShowAlarmDetail = (alarmId: number) => {
    setShowAlarmDetail(alarmId);
  };

  const handleCloseAlarmDetail = () => {
    setShowAlarmDetail(null);
  };

  const handleDeleteAlarm = async (
    e: React.MouseEvent<HTMLDivElement>,
    alarmId: number,
  ) => {
    e.stopPropagation();
    const response = window.confirm('알림을 삭제하시겠습니까?');
    if (response) {
      const result = await deleteAlarm(alarmId);
      result && refetch();
    }
  };

  return (
    <>
      <StPageHeader>
        <h1>알림 관리</h1>
        <Tab<ALARM_STATUS>
          style="primary"
          size="md"
          tabItems={ALARM_STATUS_LIST}
          translator={alarmStatusTranslator}
          selectedInitial={tab}
          onChange={onChangeTab}
        />
        <hr />
        <p>총 {totalCount}개</p>
      </StPageHeader>

      <ListWrapper>
        {alarmList.map((alarm) => (
          <StListItem
            key={alarm.alarmId}
            onClick={() => handleShowAlarmDetail(alarm.alarmId)}>
            <p
              className={
                alarm.status === 'SCHEDULED'
                  ? 'alarm-status before'
                  : 'alarm-status after'
              }>
              {alarmStatusTranslator[alarm.status]}
            </p>

            <div className="alarm-info-wrap">
              <div>
                <p className="alarm-title">{alarm.title}</p>
                <Tag size="sm" shape="pill" variant="primary" type="line">
                  {alarm.part ?? '지정대상'}
                </Tag>
              </div>

              <p className="alarm-sent-at">
                {alarm.alarmType + ': '}
                {alarm.sendAt
                  ? dayjs(alarm.sendAt).format('YYYY/MM/DD HH:mm')
                  : ''}
              </p>
            </div>

            <p className="alarm-content">{alarm.content}</p>
            <div>
              <StActionButton
                onClick={(e) =>
                  alarm.status === 'SCHEDULED' &&
                  toggleDropdown(e, alarm.alarmId)
                }>
                <IcMore />
              </StActionButton>

              {activeDropdownId === alarm.alarmId && (
                <div
                  className="delete_dropdown"
                  onClick={(e) =>
                    alarm.status === 'SCHEDULED' &&
                    handleDeleteAlarm(e, alarm.alarmId)
                  }>
                  <p>삭제하기</p>
                </div>
              )}
            </div>
          </StListItem>
        ))}
      </ListWrapper>

      {showAlarmDetail && (
        <Modal>
          <ShowAlarmModal
            onClose={handleCloseAlarmDetail}
            alarmId={showAlarmDetail}
          />
        </Modal>
      )}
    </>
  );
}

export default AlarmList;

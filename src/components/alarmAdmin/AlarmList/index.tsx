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
      try {
        await deleteAlarm(alarmId);
        refetch();
      } catch (e) {
        console.error(e);
      }
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
            key={alarm.id}
            onClick={() => handleShowAlarmDetail(alarm.id)}>
            <p
              className={
                alarm.status === 'SCHEDULED'
                  ? 'alarm-status before'
                  : 'alarm-status after'
              }>
              {alarm.status}
            </p>

            <div className="alarm-info-wrap">
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <p className="alarm-title">{alarm.title}</p>
                <Tag size="sm" shape="pill" variant="secondary" type="line">
                  {alarm.targetType}
                </Tag>
                <Tag size="sm" shape="pill" variant="primary" type="line">
                  {alarm.targetPart ?? '지정대상'}
                </Tag>
              </div>

              <p className="alarm-sent-at">
                {alarm.sendType + ' : '}
                {alarm.sendAt
                  ? dayjs(alarm.sendAt).format('YYYY/MM/DD HH:mm')
                  : ''}
              </p>
            </div>

            <p className="alarm-content">{alarm.content}</p>
            <div>
              <StActionButton onClick={(e) => toggleDropdown(e, alarm.id)}>
                <IcMore />
              </StActionButton>

              {activeDropdownId === alarm.id && (
                <div
                  className="delete_dropdown"
                  onClick={(e) => handleDeleteAlarm(e, alarm.id)}>
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

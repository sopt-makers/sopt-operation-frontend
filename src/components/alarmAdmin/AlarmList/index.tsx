import dayjs from 'dayjs';
import { useState } from 'react';
import { UseQueryResult } from 'react-query';

import IcMore from '@/assets/icons/IcMore.svg';
import { StActionButton } from '@/components/attendanceAdmin/session/SessionList/style';
import Chip from '@/components/common/Chip';
import FilterButton from '@/components/common/FilterButton';
import ListActionButton from '@/components/common/ListActionButton';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { deleteAlarm, sendAlarm } from '@/services/api/alarm';

import ShowAlarmModal from '../ShowAlarmModal';
import { StListItem, StPageHeader } from './style';

const sendStatusList: ALARM_STATUS[] = ['전체', '발송 전', '발송 후'];

interface Props {
  data: Alarm[];
  refetch: () => void;
}

function AlarmList(props: Props) {
  const { data, refetch } = props;

  const [tab, setTab] = useState<ALARM_STATUS>('전체');
  const [activeDropdownId, setActiveDropdownId] = useState<number | null>(null);
  const [showAlarmDetail, setShowAlarmDetail] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);

  const onChangeTab = (value: ALARM_STATUS) => {
    setTab(value);
  };

  const toggleDropdown = (e: React.MouseEvent, alarmId: number): void => {
    e.stopPropagation();
    if (activeDropdownId === alarmId) {
      setActiveDropdownId(null);
    } else {
      setActiveDropdownId(alarmId);
    }
  };

  const onSendAlarm = async (alarmId: number, title: string) => {
    const response = window.confirm(`${title} 알림을 전송하시겠습니까?`);
    if (response) {
      setIsSending(true);
      const result = await sendAlarm(alarmId);
      setIsSending(false);
      window.alert(result ? '전송에 성공했습니다' : '전송에 실패했습니다');
      refetch();
    }
  };

  const onShowAlarmDetail = (alarmId: number) => {
    setShowAlarmDetail(alarmId);
  };

  const onCloseAlarmDetail = () => {
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

  const alarmList = data
    ? data.filter((item) => (tab === '전체' ? true : item.status === tab))
    : [];

  return (
    <>
      <StPageHeader>
        <h1>알림 관리</h1>
        <FilterButton<ALARM_STATUS>
          list={sendStatusList}
          selected={tab}
          onChange={onChangeTab}
        />
        <p>총 {alarmList.length}개</p>
      </StPageHeader>

      <ListWrapper>
        {alarmList.map((alarm) => (
          <StListItem
            key={alarm.alarmId}
            onClick={() => onShowAlarmDetail(alarm.alarmId)}>
            <p
              className={
                alarm.status === '발송 전'
                  ? 'alarm-status before'
                  : 'alarm-status after'
              }>
              {alarm.status}
            </p>
            <div className="alarm-info-wrap">
              <div>
                <p className="alarm-title">{alarm.title}</p>
                <Chip text={alarm.part ?? '전체'} />
                <Chip text={alarm.attribute} />
              </div>
              <p className="alarm-sent-at">
                발송 일자:{' '}
                {alarm.sendAt
                  ? dayjs(alarm.sendAt).format('YYYY/MM/DD HH:mm')
                  : ''}
              </p>
            </div>
            <p className="alarm-content">{alarm.content}</p>
            <div className="alarm-send">
              <ListActionButton
                text="전송"
                onClick={(e) => {
                  e.stopPropagation();
                  onSendAlarm(alarm.alarmId, alarm.title);
                }}
                disabled={alarm.status === '발송 후'}
              />
            </div>
            <div>
              <StActionButton onClick={(e) => toggleDropdown(e, alarm.alarmId)}>
                <IcMore />
              </StActionButton>
              {activeDropdownId === alarm.alarmId && (
                <div
                  className="delete_dropdown"
                  onClick={(e) => handleDeleteAlarm(e, alarm.alarmId)}>
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
            onClose={onCloseAlarmDetail}
            alarmId={showAlarmDetail}
          />
        </Modal>
      )}

      {isSending && <Loading />}
    </>
  );
}

export default AlarmList;

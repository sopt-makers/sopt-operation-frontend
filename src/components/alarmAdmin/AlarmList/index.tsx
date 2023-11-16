import dayjs from 'dayjs';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import IcMore from '@/assets/icons/IcMore.svg';
import { StActionButton } from '@/components/attendanceAdmin/session/SessionList/style';
import Chip from '@/components/common/Chip';
import FilterButton from '@/components/common/FilterButton';
import ListActionButton from '@/components/common/ListActionButton';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import Modal from '@/components/common/modal';
import { currentGenerationState } from '@/recoil/atom';
import { sendAlarm } from '@/services/api/alarm';
import { useGetAlarmList } from '@/services/api/alarm/query';

import ShowAlarmModal from '../ShowAlarmModal';
import { StListItem, StPageHeader } from './style';

const sendStatusList: ALARM_STATUS[] = ['전체', '발송 전', '발송 후'];

function AlarmList() {
  const [tab, setTab] = useState<ALARM_STATUS>('전체');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAlarmDetail, setShowAlarmDetail] = useState<number | null>(null);

  const currentGeneration = useRecoilValue(currentGenerationState);

  const { data, isLoading, isError } = useGetAlarmList(
    parseInt(currentGeneration),
  );

  const onChangeTab = (value: ALARM_STATUS) => {
    setTab(value);
  };

  const onSendAlarm = async (alarmId: number, title: string) => {
    const response = window.confirm(`${title} 알림을 전송하시겠습니까?`);
    if (response) {
      const result = await sendAlarm(alarmId);
      window.alert(result ? '전송에 성공했습니다' : '전송에 실패했습니다');
    }
  };

  const onShowAlarmDetail = (alarmId: number) => {
    setShowAlarmDetail(alarmId);
  };

  const onCloseAlarmDetail = () => {
    setShowAlarmDetail(null);
  };

  const alarmList = data
    ? data.filter((item) => (tab === '전체' ? true : item.status === tab))
    : [];

  if (isLoading) return <Loading />;
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
          <StListItem key={alarm.alarmId}>
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
                발송 일자: {dayjs(alarm.sentAt).format('YYYY/MM/DD HH:mm')}
              </p>
            </div>
            <p className="alarm-content">{alarm.content}</p>
            <div className="alarm-send">
              <ListActionButton
                text="전송"
                onClick={() => onSendAlarm(alarm.alarmId, alarm.title)}
                disabled={alarm.status === '발송 후'}
              />
            </div>
            <StActionButton
              onClick={(e) => {
                e.stopPropagation();
                onShowAlarmDetail(alarm.alarmId);
              }}>
              <IcMore />
            </StActionButton>
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
    </>
  );
}

export default AlarmList;

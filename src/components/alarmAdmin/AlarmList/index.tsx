import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import IcMore from '@/assets/icons/IcMore.svg';
import { StActionButton } from '@/components/attendanceAdmin/session/SessionList/style';
import Chip from '@/components/common/Chip';
import FilterButton from '@/components/common/FilterButton';
import ListActionButton from '@/components/common/ListActionButton';
import ListWrapper from '@/components/common/ListWrapper';
import Loading from '@/components/common/Loading';
import { currentGenerationState } from '@/recoil/atom';
import { useGetAlarmList } from '@/services/api/alarm/query';
import { sendStatusTranslator } from '@/utils/translator';

import { StListItem, StPageHeader } from './style';

const sendStatusList: ALARM_STATUS[] = ['ALL', 'BEFORE', 'AFTER'];

function AlarmList() {
  const [tab, setTab] = useState<ALARM_STATUS>('ALL');

  const currentGeneration = useRecoilValue(currentGenerationState);

  const {
    data: alarmList,
    isLoading,
    isError,
  } = useGetAlarmList(parseInt(currentGeneration));

  const onChangeTab = (value: ALARM_STATUS) => {
    setTab(value);
  };

  if (isLoading || !alarmList) return <Loading />;
  return (
    <>
      <StPageHeader>
        <h1>알림 관리</h1>
        <FilterButton<ALARM_STATUS>
          list={sendStatusList}
          selected={tab}
          onChange={onChangeTab}
          translator={sendStatusTranslator}
        />
        <p>총 0개</p>
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
              <p className="alarm-sent-at">발송 일자: {alarm.sentAt}</p>
            </div>
            <p className="alarm-content">{alarm.content}</p>
            <ListActionButton text="전송" />
            <StActionButton
              onClick={(e) => {
                e.stopPropagation();
              }}>
              <IcMore />
            </StActionButton>
          </StListItem>
        ))}
      </ListWrapper>
    </>
  );
}

export default AlarmList;

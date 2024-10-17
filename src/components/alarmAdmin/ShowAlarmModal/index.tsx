import ModalHeader from '@/components/common/modal/ModalHeader';

import { StAlarmModalWrapper } from '../CreateAlarmModal/style';
import { useGetAlarm } from '@/services/api/alarm/query';
import Loading from '@/components/common/Loading';
import { StModalBody, StTextField } from './style';
import dayjs from 'dayjs';

interface Props {
  onClose: () => void;
  alarmId: number;
}

const targetTypeTranslator = {
  ACTIVE: '활동 회원',
  INACTIVE: '비활동 회원',
  CSV: 'CSV 첨부',
};

function ShowAlarmModal(props: Props) {
  const { onClose, alarmId } = props;

  const { data, isLoading } = useGetAlarm(alarmId);

  if (isLoading || !data) return <Loading />;
  return (
    <StAlarmModalWrapper>
      <ModalHeader title="알림 조회" desc="" onClose={onClose} />
      <StModalBody>
        <div>
          <StTextField>
            <label>발송 대상</label>
            <p>{targetTypeTranslator[data.targetType]}</p>
          </StTextField>
          <StTextField>
            <label>발송 파트</label>
            <p>{data.part ?? '전체'}</p>
          </StTextField>
        </div>

        <div>
          <StTextField full>
            <label>알림 제목</label>
            <p>{data.title}</p>
          </StTextField>
        </div>

        <div>
          <StTextField full textarea>
            <label>알림 내용</label>
            <p>{data.content}</p>
          </StTextField>
        </div>

        <div>
          <StTextField full>
            <label>알림 발송 날짜</label>
            <p>{dayjs(data.createdAt).format('YYYY-MM-DD')}</p>
          </StTextField>
          <StTextField full>
            <label>알림 발송 시간</label>
            <p>{dayjs(data.createdAt).format('HH:mm')}</p>
          </StTextField>
        </div>

        {/* <div className="dropdowns">
          <OptionTemplate title="발송 대상">
            <Selector content={activeStatus} readOnly />
          </OptionTemplate>
          {activeStatus !== 'CSV 첨부' && (
            <>
              <OptionTemplate title="파트">
                <Selector content={data.part} readOnly />
              </OptionTemplate>
              <OptionTemplate title="발송 기수">
                <Selector content={`${generation}기`} readOnly />
              </OptionTemplate>
            </>
          )}
        </div> */}
      </StModalBody>
    </StAlarmModalWrapper>
  );
}

export default ShowAlarmModal;

import ModalHeader from '@/components/common/modal/ModalHeader';

import {
  StAlarmModalWrapper,
  StAlarmModalFooter,
  StAlarmModalBody,
  StTextField,
  StRadioWrap,
  StRadio,
  StLink,
} from './style';
import { useGetAlarm } from '@/services/api/alarm/query';
import Loading from '@/components/common/Loading';
import dayjs from 'dayjs';
import { Button } from '@sopt-makers/ui';
import { IconLink } from '@sopt-makers/icons';
import { colors } from '@sopt-makers/colors';

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

      <StAlarmModalBody>
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

        <div>
          <StRadioWrap>
            <label>링크 첨부</label>
            <div>
              <StRadio checked={!data.linkType}>첨부 안함</StRadio>
              <StRadio checked={data.linkType === 'WEB'}>웹링크</StRadio>
              <StRadio checked={data.linkType === 'APP'}>앱 내 딥링크</StRadio>
            </div>
            {data.link && data.linkType && (
              <StLink linkType={data.linkType} href={data.link} target="_blank">
                <IconLink
                  style={{ width: '16px', height: '16px' }}
                  color={colors.gray200}
                />
                {data.link}
              </StLink>
            )}
          </StRadioWrap>
        </div>
      </StAlarmModalBody>

      <StAlarmModalFooter>
        <Button size="lg" theme="white" rounded="md" onClick={onClose}>
          확인
        </Button>
      </StAlarmModalFooter>
    </StAlarmModalWrapper>
  );
}

export default ShowAlarmModal;

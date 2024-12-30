import { colors } from '@sopt-makers/colors';
import { IconLink } from '@sopt-makers/icons';
import { Button, Chip } from '@sopt-makers/ui';
import dayjs from 'dayjs';

import Loading from '@/components/common/Loading';
import ModalHeader from '@/components/common/modal/ModalHeader';
import { useGetAlarm } from '@/services/api/alarm/query';
import { targetTypeTranslator } from '@/utils/translator';

import {
  StAlarmModalBody,
  StAlarmModalFooter,
  StAlarmModalWrapper,
  StLink,
  StRadioWrap,
  StTextField,
} from './style';

interface Props {
  onClose: () => void;
  alarmId: number;
}

function ShowAlarmModal(props: Props) {
  const { onClose, alarmId } = props;

  const { data, isLoading } = useGetAlarm(alarmId);

  console.log(data);

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
            <p>{dayjs(data.sendAt).format('YYYY-MM-DD')}</p>
          </StTextField>
          <StTextField full>
            <label>알림 발송 시간</label>
            <p>{dayjs(data.sendAt).format('HH:mm')}</p>
          </StTextField>
        </div>

        <div>
          <StRadioWrap>
            <label>링크 첨부</label>
            <div>
              <Chip active={!data.linkType} disabled>
                첨부 안 함
              </Chip>
              <Chip active={data.linkType === 'WEB'} disabled>
                웹링크
              </Chip>
              <Chip active={data.linkType === 'APP'} disabled>
                앱 내 딥링크
              </Chip>
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

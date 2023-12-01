import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import ModalFooter from '@/components/common/modal/ModalFooter';
import ModalHeader from '@/components/common/modal/ModalHeader';
import OptionTemplate from '@/components/common/OptionTemplate';
import Selector from '@/components/common/Selector';
import { currentGenerationState } from '@/recoil/atom';
import { getAlarm } from '@/services/api/alarm';

import {
  StAlarmModalWrapper,
  StAlarmTypeButton,
  StTextArea,
} from '../CreateAlarmModal/style';

interface Props {
  onClose: () => void;
  alarmId: number;
}

function ShowAlarmModal(props: Props) {
  const { onClose, alarmId } = props;

  const generation = useRecoilValue(currentGenerationState);

  const [data, setData] = useState<AlarmDetail>({
    attribute: '',
    part: null,
    isActive: null,
    title: '',
    content: '',
    link: null,
    createdAt: '',
    sendAt: '',
  });

  useEffect(() => {
    (async () => {
      const alarmData = await getAlarm(alarmId);
      setData(alarmData);
    })();
  }, [alarmId]);

  const activeStatus = useMemo(() => {
    switch (data.isActive) {
      case true:
        return '활동 회원';
      case false:
        return '비활동 회원';
      default:
        return 'CSV 첨부';
    }
  }, [data.isActive]);

  return (
    <StAlarmModalWrapper>
      <ModalHeader title="알림 조회" desc="" onClose={onClose} />
      <main>
        <div className="type_selector">
          <StAlarmTypeButton
            type="button"
            isSelected={data.attribute === '공지'}
            readOnly>
            공지
          </StAlarmTypeButton>
          <StAlarmTypeButton
            type="button"
            isSelected={data.attribute === '소식'}
            readOnly>
            소식
          </StAlarmTypeButton>
        </div>

        <div className="dropdowns">
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
        </div>

        <div className="inputs">
          <OptionTemplate title="알림 제목">
            <Input
              readOnly
              type="text"
              placeholder="발송할 알림의 제목을 입력하세요."
              value={data.title}
            />
          </OptionTemplate>
          <OptionTemplate title="알림 내용">
            <StTextArea
              readOnly
              placeholder="발송할 알림의 내용을 입력하세요."
              value={data.content}
            />
          </OptionTemplate>
          <OptionTemplate title="링크 첨부">
            <Selector content="기능 추가 예정입니다." isDisabledValue={true} />
          </OptionTemplate>
        </div>
      </main>

      <ModalFooter>
        <></>
      </ModalFooter>
    </StAlarmModalWrapper>
  );
}

export default ShowAlarmModal;

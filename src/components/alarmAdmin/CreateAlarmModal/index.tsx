import ModalHeader from '@/components/common/modal/ModalHeader';

import { StAlarmModalWrapper } from './style';

function CreateAlarmModal() {
  return (
    <StAlarmModalWrapper>
      <ModalHeader title="알림 생성" desc="APP으로 발송할 알림을 생성합니다." />
    </StAlarmModalWrapper>
  );
}

export default CreateAlarmModal;

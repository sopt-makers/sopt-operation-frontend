import { IcModalClose } from '@/assets/icons';

import { StHeader, StTitle, StWrapper } from './style';

type Props = {
  onClose: () => void;
};

const SessionDetailModal = ({ onClose }: Props) => {
  return (
    <StWrapper>
      <StHeader>
        <StTitle>
          <h1>세션 정보</h1>
          <IcModalClose onClick={onClose} />
        </StTitle>
        <h2>생성된 SOPT 세션 정보를 조회합니다.</h2>
      </StHeader>
    </StWrapper>
  );
};

export default SessionDetailModal;

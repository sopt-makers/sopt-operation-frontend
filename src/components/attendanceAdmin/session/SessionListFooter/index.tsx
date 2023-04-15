import Button from '@/components/common/Button';

import { StFooterWrapper } from './style';

interface Props {
  onClick: () => void;
}

function SessionListFooter(props: Props) {
  const { onClick } = props;

  return (
    <StFooterWrapper>
      <Button onClick={onClick} type={'submit'} text={'세션 생성하기'} />
    </StFooterWrapper>
  );
}

export default SessionListFooter;

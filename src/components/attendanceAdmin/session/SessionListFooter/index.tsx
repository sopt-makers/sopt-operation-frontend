import { useRecoilValue } from 'recoil';

import Button from '@/components/common/Button';
import { currentGenerationState } from '@/recoil/atom';

import { StFooterWrapper } from './style';

interface Props {
  onClick: () => void;
}

function SessionListFooter(props: Props) {
  const { onClick } = props;
  const currentGeneration = useRecoilValue(currentGenerationState);

  return (
    <StFooterWrapper>
      <Button
        onClick={onClick}
        type={'submit'}
        disabled={currentGeneration !== '33' && true}
        text={'세션 생성하기'}
      />
    </StFooterWrapper>
  );
}

export default SessionListFooter;

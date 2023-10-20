import { useRecoilValue } from 'recoil';

import Button from '@/components/common/Button';
import { currentGenerationState } from '@/recoil/atom';
import { ACTIVITY_GENRATION } from '@/utils/generation';

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
        disabled={currentGeneration !== ACTIVITY_GENRATION}
        text={'세션 생성하기'}
      />
    </StFooterWrapper>
  );
}

export default SessionListFooter;

import Button from '@/components/common/Button';
import {
  StAboutTabActionContainer,
  StButtonContainer,
} from '@/components/orgAdmin/AboutTab/AboutTabAction/style';

interface Props {
  onSave: () => void;
  onPublish: () => void;
}
function AboutTabAction({ onSave, onPublish }: Props) {
  return (
    <StAboutTabActionContainer>
      <StButtonContainer>
        <Button type={'submit'} text={'공홈에 노출하기'} onClick={onPublish} />
      </StButtonContainer>
      <StButtonContainer>
        <Button type={'submit'} text={'저장하기'} onClick={onSave} />
      </StButtonContainer>
    </StAboutTabActionContainer>
  );
}

export default AboutTabAction;

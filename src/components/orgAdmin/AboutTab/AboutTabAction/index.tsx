import Button from '@/components/common/Button';
import {
  StAboutTabActionContainer,
  StButtonContainer,
} from '@/components/orgAdmin/AboutTab/AboutTabAction/style';

interface Props {
  onSave: () => void;
  onPublish: () => void;
  isPublished: boolean;
}
function AboutTabAction({ onSave, onPublish, isPublished }: Props) {
  return (
    <StAboutTabActionContainer>
      <StButtonContainer>
        <Button type={'submit'} text={'임시 저장하기'} onClick={onSave} />
      </StButtonContainer>
      <StButtonContainer>
        <Button
          type={'submit'}
          text={isPublished ? '공홈에서 숨기기' : '공홈에 노출하기'}
          onClick={onPublish}
        />
      </StButtonContainer>
    </StAboutTabActionContainer>
  );
}

export default AboutTabAction;

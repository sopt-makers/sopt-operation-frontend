import Button from '@/components/common/Button';
import {
  StButtonContainer,
  StLayout,
} from '@/components/orgAdmin/AboutTab/AboutTabAction/style';

interface Props {
  onSave: () => void;
  onPublish: () => void;
}
const AboutTabAction = ({ onSave, onPublish }: Props) => {
  return (
    <StLayout>
      <StButtonContainer>
        <Button type={'submit'} text={'공홈에 노출하기'} onClick={onPublish} />
      </StButtonContainer>
      <StButtonContainer>
        <Button type={'submit'} text={'저장하기'} onClick={onSave} />
      </StButtonContainer>
    </StLayout>
  );
};

export default AboutTabAction;

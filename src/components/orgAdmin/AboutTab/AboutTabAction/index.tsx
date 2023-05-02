import { StLayout } from '@/components/orgAdmin/AboutTab/AboutTabAction/style';
import Button from '@/components/common/Button';

interface Props {
  onClick: () => void;
}
const AboutTabAction = ({ onClick }: Props) => {
  return (
    <StLayout>
      <div>
        <Button type={'submit'} text={'저장하기'} onClick={onClick} />
      </div>
    </StLayout>
  );
};

export default AboutTabAction;

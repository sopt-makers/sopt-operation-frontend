import { StLayout } from '@/components/orgAdmin/AboutTab/AboutTabAction/style';
import Button from '@/components/common/Button';

const AboutTabAction = () => {
  return (
    <StLayout>
      <div>
        <Button type={'submit'} text={'저장하기'} />
      </div>
      <div>
        <Button type={'submit'} text={'미리보기'} />
      </div>
    </StLayout>
  );
};

export default AboutTabAction;

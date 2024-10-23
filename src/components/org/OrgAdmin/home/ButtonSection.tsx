import {
  StButtonFormContainer,
  StFirstSectionContainer,
  StTitle,
} from '@/components/org/OrgAdmin/home/style';
import { TextField } from '@sopt-makers/ui';

const ButtonSection = () => {
  return (
    <StFirstSectionContainer>
      <StButtonFormContainer>
        <StTitle>메인 버튼</StTitle>

        <TextField
          labelText="문구"
          placeholder="ex. 00기 YB 지원하기"
          value={''}
        />
        <TextField
          labelText="키 컬러"
          descriptionText="호버 시, 하이라이트는 키컬러로 보여요."
          placeholder="ex. ffffff"
          value={''}
        />
        <TextField
          labelText="서브 컬러"
          descriptionText="호버하지 않았을 때, 버튼은 서브 컬러로 보여요."
          placeholder="ex. ffffff"
          value={''}
        />
      </StButtonFormContainer>
      <div>실시간 버튼</div>
    </StFirstSectionContainer>
  );
};

export default ButtonSection;

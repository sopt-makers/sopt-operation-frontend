import { TextField } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

import LiveAppliedButton from '@/components/org/OrgAdmin/HomeSection/LiveAppliedButton';
import {
  StButtonFormContainer,
  StContentContainer,
  StFirstSectionContainer,
  StTitle,
} from '@/components/org/OrgAdmin/HomeSection/style';

type ButtonSectionProps = {
  mainButton?: {
    text: string;
    keyColor: string;
    subColor: string;
  };
};

const ButtonSection = ({ mainButton }: ButtonSectionProps) => {
  const { register, watch } = useFormContext();

  const textString = watch('text');
  const keyColorString = watch('keyColor');
  const subColorString = watch('subColor');

  return (
    <StFirstSectionContainer>
      <StTitle>메인 버튼</StTitle>

      <StContentContainer>
        <StButtonFormContainer>
          <TextField
            type="text"
            labelText="문구"
            placeholder="ex. 00기 YB 지원하기"
            {...register('text')}
          />
          <TextField
            type="text"
            labelText="키 컬러"
            descriptionText="호버 시, 하이라이트는 키컬러로 보여요."
            placeholder="ex. ffffff"
            {...register('keyColor', { maxLength: 6 })}
          />
          <TextField
            type="text"
            labelText="서브 컬러"
            descriptionText="호버하지 않았을 때, 버튼은 서브 컬러로 보여요."
            placeholder="ex. ffffff"
            {...register('subColor', { maxLength: 6 })}
          />
        </StButtonFormContainer>

        <LiveAppliedButton
          text={textString || mainButton?.text}
          keyColor={
            String(keyColorString).length === 6
              ? `#${keyColorString}`
              : (mainButton?.keyColor ?? '#ffffff')
          }
          subColor={
            String(subColorString).length === 6
              ? `#${subColorString}`
              : (mainButton?.subColor ?? '#ffffff')
          }
        />
      </StContentContainer>
    </StFirstSectionContainer>
  );
};

export default ButtonSection;

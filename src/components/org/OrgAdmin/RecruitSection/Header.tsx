import { useFormContext } from 'react-hook-form';

import RequiredIcon from '../assets/RequiredIcon';
import MyDropzone from '../MyDropzone';
import {
  StDescription,
  StLabel,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import { StLabelWrapper } from './style';

const Header = () => {
  const method = useFormContext();

  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>지원하기탭 헤더</StTitle>
        <StLabelWrapper>
          <StLabel>이미지</StLabel>
          <RequiredIcon />
        </StLabelWrapper>
        <StDescription>
          이미지는 1920*580 크기로 올려주세요. ‘지원하기’탭 가장 상단에 보여지는
          이미지예요.
        </StDescription>
        <MyDropzone method={method} label="recruitHeaderImage" />
      </StTitleWrapper>
    </StWrapper>
  );
};

export default Header;

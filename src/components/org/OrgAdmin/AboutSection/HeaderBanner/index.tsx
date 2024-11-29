import { useFormContext } from 'react-hook-form';

import RequiredIcon from '../../assets/RequiredIcon';
import MyDropzone from '../../MyDropzone';
import { StDescription, StInputLabel, StTitle, StWrapper } from '../style';
import { StContentWrapper } from './style';

const HeaderBanner = () => {
  const method = useFormContext();
  return (
    <StWrapper>
      <StTitle>소개탭 헤더</StTitle>
      <StContentWrapper>
        <StInputLabel>
          <span>이미지</span>
          <RequiredIcon />
        </StInputLabel>
        <StDescription>
          이미지는 1920*630 크기로 올려주세요. ‘소개’탭 가장 상단에 보여지는
          이미지예요.
        </StDescription>
        <MyDropzone
          method={method}
          label="headerImageFileName"
          width="582px"
          height="191px"
        />
      </StContentWrapper>
    </StWrapper>
  );
};

export default HeaderBanner;

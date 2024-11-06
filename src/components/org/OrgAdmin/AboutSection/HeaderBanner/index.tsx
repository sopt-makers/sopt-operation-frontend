import { StDescription, StInputLabel, StTitle, StWrapper } from '../style';
import { StContentWrapper, StDummyImageInput } from './style';

const HeaderBanner = () => {
  return (
    <StWrapper>
      <StTitle>헤더</StTitle>
      <StContentWrapper>
        <StInputLabel>이미지</StInputLabel>
        <StDescription>
          이미지는 1920*630 크기로 올려주세요. ‘소개’탭 가장 상단에 보여지는
          이미지예요.
        </StDescription>
        <StDummyImageInput />
      </StContentWrapper>
    </StWrapper>
  );
};

export default HeaderBanner;

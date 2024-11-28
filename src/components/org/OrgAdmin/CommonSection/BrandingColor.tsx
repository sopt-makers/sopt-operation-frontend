import {
  StDescription,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import BrandingSubColor from './BrandingSubColor';
import ColorInputField from './ColorInputField';

const BrandingColor = () => {
  return (
    <StWrapper>
      <StTitleWrapper>
        <StTitle>브랜딩 컬러</StTitle>
        <StDescription>다크 모드를 고려하여 선정해주세요.</StDescription>
      </StTitleWrapper>
      <StInputWrapper>
        <ColorInputField label="키컬러 (메인)" id="brandingColor_main" />
        <ColorInputField label="키컬러 (저명도)" id="brandingColor_low" />
        <ColorInputField label="키컬러 (고명도)" id="brandingColor_high" />
        <BrandingSubColor />
      </StInputWrapper>
    </StWrapper>
  );
};

export default BrandingColor;

import Modal from '../common/Modal';
import useModal from '../common/Modal/useModal';
import {
  StDescription,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import BrandingSubColor from './BrandingSubColor';
import ColorInputField from './ColorInputField';
import { StStretchContainer } from './style';

const BrandingColor = () => {
  const { isInfoVisible, onInfoToggle } = useModal();

  return (
    <StStretchContainer>
      <StWrapper>
        <StTitleWrapper>
          <StTitle>브랜딩 컬러</StTitle>
          <StDescription>다크 모드를 고려하여 선정해주세요.</StDescription>
        </StTitleWrapper>
        <StInputWrapper>
          <ColorInputField label="키컬러 (메인)" id="brandingColor.main" />
          <ColorInputField label="키컬러 (저명도)" id="brandingColor.low" />
          <ColorInputField label="키컬러 (고명도)" id="brandingColor.high" />
          <BrandingSubColor onInfoToggle={onInfoToggle} />
        </StInputWrapper>
      </StWrapper>{' '}
      <Modal
        title="서브컬러 (강조 그레이 컬러) 예시"
        description="&#39;모집안내&#39; 탭 속 파트별 소개 &#39;👍이런 분이면 좋아요!&#39;의 백그라운 컬러예요."
        subDescription="키컬러 저명도와 그레이 컬러 사이, 컬러를 지정해주세요."
        imgSrc="/images/org/imgSubColorInfo.png"
        isInfoVisible={isInfoVisible}
        onInfoToggle={onInfoToggle}
      />
    </StStretchContainer>
  );
};

export default BrandingColor;

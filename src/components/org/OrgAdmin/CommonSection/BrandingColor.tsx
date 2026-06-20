import {
  StDescription,
  StInputWrapper,
  StTitle,
  StTitleWrapper,
  StWrapper,
} from '../style';
import ColorInputField from './ColorInputField';
import ColorRadioField from './ColorRadioField';
import { StInputFieldWrapper, StStretchContainer } from './style';

const BRANDING_COLOR_FIELD_IDS = {
  darkKeyColor: 'brandingColor.darkKeyColor',
  darkTextOnColor: 'brandingColor.darkTextOnColor',
  lightKeyColor: 'brandingColor.lightKeyColor',
  lightTextOnColor: 'brandingColor.lightTextOnColor',
} as const;

const BrandingColor = () => {
  return (
    <StStretchContainer>
      <StWrapper>
        <StTitleWrapper>
          <StTitle>브랜딩 컬러</StTitle>
          <StDescription>
            콘텐츠를 명확하게 읽을 수 있도록 텍스트 접근성을 고려해
            설정해주세요.
          </StDescription>
        </StTitleWrapper>

        <StInputFieldWrapper>
          <StInputWrapper>
            <ColorInputField
              label="다크 모드 키컬러"
              id={BRANDING_COLOR_FIELD_IDS.darkKeyColor}
              description="다크 모드 텍스트와 컴포넌트에 강조색으로 적용돼요."
            />
            <ColorRadioField
              label="다크 모드 키컬러 위 텍스트"
              description="다크 모드 키컬러 위에 사용되는 텍스트와 아이콘 컬러예요."
              id={BRANDING_COLOR_FIELD_IDS.darkTextOnColor}
              keyColorId={BRANDING_COLOR_FIELD_IDS.darkKeyColor}
              defaultValue="dark"
            />
          </StInputWrapper>

          <StInputWrapper>
            <ColorInputField
              label="라이트 모드 키컬러"
              id={BRANDING_COLOR_FIELD_IDS.lightKeyColor}
              description="라이트 모드 키컬러와 컴포넌트에 강조색으로 적용돼요."
              previewDefaultColor="#000000"
            />
            <ColorRadioField
              label="라이트 모드 키컬러 위 텍스트"
              description="라이트 모드 키컬러 위에 사용되는 텍스트와 아이콘 컬러예요."
              id={BRANDING_COLOR_FIELD_IDS.lightTextOnColor}
              keyColorId={BRANDING_COLOR_FIELD_IDS.lightKeyColor}
              previewDefaultColor="#000000"
              defaultValue="light"
              lightRecommended
            />
          </StInputWrapper>
        </StInputFieldWrapper>
      </StWrapper>
    </StStretchContainer>
  );
};

export default BrandingColor;

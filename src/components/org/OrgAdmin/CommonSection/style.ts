import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import zIndex from '@/utils/zIndex';

export const StRadioWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;

  input[type='radio'] {
    width: 26px;
    height: 26px;
  }
`;

export const StRadioBox = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const StRadioLabel = styled.label`
  ${fontsObject.BODY_2_16_M};

  color: ${colors.white};
  cursor: pointer;
`;

export const StDateWrapper = styled.div`
  margin-bottom: 40px;
`;

export const StColorWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

export const StColorPreview = styled.input`
  width: 48px;
  height: 48px;
  padding: 0;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;

  ::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  ::-webkit-color-swatch {
    border: none;
  }
`;

export const StInfoButton = styled.button`
  ${fontsObject.LABEL_3_14_SB};

  color: ${colors.white};
`;

interface StInfoWrapperProps {
  isVisible: boolean;
}

export const StInfoWrapper = styled.article<StInfoWrapperProps>`
  position: absolute;
  bottom: 0;
  right: 0;
  border-radius: 12px;
  width: 500px;
  height: 457px;
  padding: 22px 33px 28px;
  background-color: ${colors.gray900};
  transform: ${({ isVisible }) =>
    isVisible ? 'translateX(0)' : 'translateX(100%)'};
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  transition: all 0.5s ease-in-out;
  z-index: ${zIndex.modal};
`;

export const StInfoTitle = styled.h2`
  ${fontsObject.HEADING_4_24_B};

  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  color: ${colors.gray10};
`;

export const StInfoCloseButton = styled.button`
  ${fontsObject.HEADING_4_24_B};

  color: ${colors.gray10};
`;

export const StInfoDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  margin-bottom: 8px;
  color: ${colors.white};
`;

export const StInfoSubDescription = styled.p`
  ${fontsObject.LABEL_4_12_SB};

  margin-bottom: 14px;
  color: ${colors.gray300};
`;

export const StErrorMessage = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  color: ${colors.error};
`;

export const StSubColorDescription = styled.p`
  ${fontsObject.LABEL_4_12_SB}

  color: ${colors.gray300};
`;

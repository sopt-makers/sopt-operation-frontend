import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { TextField } from '@sopt-makers/ui';

import zIndex from '@/utils/zIndex';

export const StContainer = styled.section`
  padding: 50px 0;
`;

export const StWrapper = styled.div`
  position: relative;
  margin-bottom: 80px;
`;

export const StTitleWrapper = styled.div`
  margin-bottom: 30px;
`;

export const StTitle = styled.h2`
  ${fontsObject.TITLE_3_24_SB}

  margin-bottom: 6px;
  color: ${colors.white};
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  color: ${colors.gray300};
`;

export const StInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StInputLabel = styled.label`
  ${fontsObject.LABEL_3_14_SB};

  margin-bottom: 8px;
  color: ${colors.white};
`;

interface StInputProps {
  hasValue?: boolean;
}

export const StInput = styled(TextField)<StInputProps>`
  width: 338px;
  color: ${({ hasValue = true }) =>
    hasValue ? `${colors.white}` : `${colors.gray300}`};

  input[type='datetime-local'] {
    color-scheme: dark;
  }
`;

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

export const StColorPreview = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 10px;
  background-color: white;
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

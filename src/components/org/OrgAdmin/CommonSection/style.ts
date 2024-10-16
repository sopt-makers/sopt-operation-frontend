import styled from '@emotion/styled';
import { fontsObject } from '@sopt-makers/fonts';

import theme from '@/styles/theme';
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
  color: ${theme.color.grayscale.realwhite};
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  color: ${theme.color.grayscale.gray300};
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
  color: ${theme.color.grayscale.realwhite};
`;

interface StInputProps {
  hasValue?: boolean;
}

export const StInput = styled.input<StInputProps>`
  width: 338px;
  height: 48px;
  padding: 11px 16px;
  border: none;
  border-radius: 10px;
  color: ${({ hasValue = true }) =>
    hasValue
      ? `${theme.color.grayscale.realwhite}`
      : `${theme.color.grayscale.gray300}`};
  background-color: ${theme.color.grayscale.gray800};

  &::placeholder {
    color: ${theme.color.grayscale.gray300};
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

export const StRadioLabel = styled.span`
  ${fontsObject.BODY_2_16_M};

  color: ${theme.color.grayscale.realwhite};
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

  color: ${theme.color.grayscale.realwhite};
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
  background-color: ${theme.color.grayscale.gray900};
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
  color: ${theme.color.grayscale.gray10};
`;

export const StInfoCloseButton = styled.button`
  ${fontsObject.HEADING_4_24_B};

  color: ${theme.color.grayscale.gray10};
`;

export const StInfoDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  margin-bottom: 8px;
  color: ${theme.color.grayscale.realwhite};
`;

export const StInfoSubDescription = styled.p`
  ${fontsObject.LABEL_4_12_SB};

  margin-bottom: 14px;
  color: ${theme.color.grayscale.gray300};
`;

export const StErrorMessage = styled.p`
  ${fontsObject.LABEL_3_14_SB};

  color: ${theme.color.sub.red};
`;

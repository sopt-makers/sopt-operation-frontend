import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { TextField } from '@sopt-makers/ui';

import theme from '@/styles/theme';

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
  color: ${colors.white};

  input[type='datetime-local'] {
    color: ${({ hasValue = true }) =>
      hasValue ? `${colors.white}` : `${colors.gray300}`};
    color-scheme: dark;
    cursor: pointer; /* 텍스트 부분에만 커서 pointer 적용 */
  }

  input[type='datetime-local']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const StSubmitButton = styled.button`
  position: fixed;
  bottom: 54px;
  right: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 112px;
  height: 56px;
  border-radius: 12px;
  background-color: ${theme.color.grayscale.realwhite};
`;

export const StSubmitText = styled.span`
  ${fontsObject.LABEL_1_18_SB}
`;

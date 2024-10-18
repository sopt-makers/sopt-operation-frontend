import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { TextField } from '@sopt-makers/ui';

export const StContainer = styled.section`
  padding: 50px 0;
`;

export const StWrapper = styled.div`
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
`;

export const StRadioWrapper = styled.div`
  display: flex;
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

  color: ${colors.white};
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

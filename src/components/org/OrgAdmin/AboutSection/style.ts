import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { TextField } from '@sopt-makers/ui';

export const StContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 50px 0;
`;

// TODO : StTitleWrapper, StTitle common 분리

export const StWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 8px;

  ${fontsObject.TITLE_3_24_SB}
  margin-bottom: 10px;
  color: ${colors.white};
`;

export const StInputLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;
  ${fontsObject.LABEL_3_14_SB};
  margin-bottom: 8px;
  color: ${colors.white};

  cursor: pointer;
`;

export const StDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray300};
`;

interface StInputProps {
  hasValue?: boolean;
}

export const StInput = styled(TextField)<StInputProps>`
  width: 338px;
  color: ${({ hasValue = true }) =>
    hasValue ? `${colors.white}` : `${colors.gray300}`};

  & label {
    gap: 8px;
  }
`;

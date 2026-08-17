import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { TextField } from '@sopt-makers/ui';

import { StInput as BaseInput } from '../style';

export const StSectionWrapper = styled.section`
  position: relative;
`;

export const StScheduleModalWrapper = styled.div`
  position: absolute;
  top: 100px;
  left: 650px;
`;

export const StScheduleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
`;

export const StScheduleHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StScheduleTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 6px;

  ${fontsObject.TITLE_3_24_SB}
  color: ${colors.white};
`;

export const StScheduleInfoButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;

  color: ${colors.white};
`;

export const StScheduleDescription = styled.p`
  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.gray300};
`;

export const StScheduleFieldLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 4px;

  ${fontsObject.LABEL_3_14_SB};
  color: ${colors.white};
`;

export const StScheduleBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StScheduleRowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StScheduleRow = styled.div`
  display: grid;
  grid-template-columns: 24px 166px 376px;
  gap: 8px;
  align-items: center;
`;

export const StScheduleIndex = styled.div`
  ${fontsObject.BODY_1_18_M};
  color: ${colors.gray300};
`;

export const StScheduleDateField = styled(BaseInput)`
  width: 166px;

  input[type='date'] {
    color: ${colors.white};
    color-scheme: dark;
    cursor: pointer;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    cursor: pointer;
  }
`;

export const StScheduleSessionField = styled(TextField)`
  width: 376px;
`;

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { TextArea } from '@sopt-makers/ui';

export const StFnaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 14px;
  gap: 8px;
  width: 100%;
  max-width: 582px;
`;

export const StQuestionTextArea = styled(TextArea)`
  textarea {
    min-height: 26px;
  }
`;

export const StAnswerTextArea = styled(TextArea)`
  textarea {
    min-height: 52px;
  }
`;

export const StFnaHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 0;
  margin-bottom: 12px;
  border-bottom: 1px solid ${colors.gray700};
`;

export const StFnaTitle = styled.h3`
  ${fontsObject.TITLE_4_20_SB};

  color: ${colors.white};
`;

export const StDeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: ${colors.gray300};

  &:hover {
    color: ${colors.white};
  }
`;

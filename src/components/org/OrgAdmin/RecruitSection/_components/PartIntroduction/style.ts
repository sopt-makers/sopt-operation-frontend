import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { TextArea } from '@sopt-makers/ui';

export const StPartIntroductionTextArea = styled(TextArea)`
  textarea {
    min-height: 26px;
  }
`;

export const StPreferenceItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StPartIntroductionModalWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 0px;
`;

export const StPreferenceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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

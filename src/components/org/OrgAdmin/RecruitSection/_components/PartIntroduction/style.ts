import styled from '@emotion/styled';
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


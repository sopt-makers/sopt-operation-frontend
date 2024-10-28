import styled from '@emotion/styled';
import { TextArea } from '@sopt-makers/ui';

import { StLabel } from '../style';

export const StLabelWrapper = styled(StLabel)`
  display: inline-block;
  margin: 30px 0px 8px;
`;

export const StTextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 18px;
`;

export const StTextArea = styled(TextArea)`
  max-width: 547px;
`;

export const StFnaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

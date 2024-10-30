import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StValueWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StInputWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

// TODO : 나중에 지워라
export const StDummyImageInput = styled.div`
  width: 224px;
  height: 190px;
  background-color: ${colors.gray800};
  border-radius: 10px;
`;

export const StInputBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

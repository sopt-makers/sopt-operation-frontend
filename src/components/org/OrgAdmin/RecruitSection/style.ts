import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StStretchContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StLabelWrapper = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
  margin: 30px 0px 8px;
`;

export const StTextAreaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 18px;
`;

export const StFnaWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StInfoButton = styled.button`
  color: ${colors.white};
  width: 20px;
`;

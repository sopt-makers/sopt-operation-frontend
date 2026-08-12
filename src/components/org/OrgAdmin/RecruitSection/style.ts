import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';

export const StRecruitContainer = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 50px 0 270px;
`;

export const StRecruitSectionWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

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
  gap: 32px;
`;

export const StTextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const StSectionWrapper = styled.section`
  position: relative;
`;

export const StModalWrapper = styled.div`
  position: absolute;
  top: 80px;
  right: 0px;
`;

export const StInfoButton = styled.button`
  color: ${colors.white};
  width: 20px;
  height: 20px;
`;

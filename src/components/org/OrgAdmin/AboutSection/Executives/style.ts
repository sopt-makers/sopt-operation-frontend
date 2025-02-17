import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const StChipWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin-bottom: 10px;
`;
export const StChipLine = styled.div`
  display: flex;
  gap: 6px;
`;
export const StChipLabel = styled.span`
  margin: 9px 14px 9px 0;
  color: ${colors.gray300};
  ${fontsObject.LABEL_3_14_SB}
`;

export const StPhotoWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
// TODO : 나중에 지워라
export const StDummyImageInput = styled.div`
  width: 168px;
  height: 168px;
  background-color: ${colors.gray800};
  border-radius: 100px;
`;

export const StSNSWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > span {
    color: ${colors.white};
    ${fontsObject.LABEL_3_14_SB};
  }
`;

export const StSNSBox = styled.li`
  display: flex;
  gap: 12px;
  align-items: center;

  & svg {
    cursor: pointer;
  }
`;

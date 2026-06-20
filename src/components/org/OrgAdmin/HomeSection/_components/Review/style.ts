import styled from "@emotion/styled";
import { colors } from "@sopt-makers/colors";
import { fontsObject } from "@sopt-makers/fonts";

export const StReviewItem = styled.li<{ $isDragging?: boolean }>`
  display: grid;
  grid-template-columns: 24px 1fr 34px;
  align-items: center;
  gap: 10px;

  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
`;

export const StReviewDragHandle = styled.button`
  display: grid;
  place-items: center;
  width: 24px;
  height: 40px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;


export const StReviewContent = styled.div`
  display: flex;
  align-items: center;

  min-height: 40px;
  padding: 0 20px;

  border-radius: 8px;
  background-color: ${colors.gray800};
  color: ${colors.white};
  ${fontsObject.LABEL_3_14_SB};
`;

export const StReviewEditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  padding: 12px 10px 12px 0;

  color: ${colors.white};
  box-sizing: border-box;

  & > svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
`;

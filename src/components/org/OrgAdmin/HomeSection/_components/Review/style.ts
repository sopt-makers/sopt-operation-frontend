import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Reorder } from 'framer-motion';

export const StReviewReorderItem = styled(Reorder.Item)`
  display: grid;
  grid-template-columns: 24px 1fr 34px;
  align-items: center;
  gap: 10px;
  list-style: none;
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

  &:disabled {
    cursor: default;
    opacity: 0.5;
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
  padding: 11px 16px;

  border-radius: 8px;
  background-color: ${colors.gray800};
  color: ${colors.white};
  ${fontsObject.BODY_2_16_M};
`;

export const StReviewEditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 34px;
  padding: 12px 10px 12px 0;

  color: ${colors.white};
  box-sizing: border-box;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }

  & > svg {
    flex-shrink: 0;
    width: 24px;
    height: 24px;
  }
`;

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { IconEdit, IconTrash } from '@sopt-makers/icons';

export const StNewsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const StNewsItem = styled.li<{ $isDragging?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  color: ${colors.white};
  ${fontsObject.TITLE_5_18_SB};

  border-radius: 10px;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

export const StNewsDragHandle = styled.button`
  display: grid;
  place-items: center;
  color: ${colors.white};
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

export const StButtonWrapper = styled.div`
  display: flex;
  padding-left: 6px;
  gap: 8px;
  flex-shrink: 0;

  & > svg {
    flex-shrink: 0;
  }
`;

type IconButtonProps = {
  $isDisabled?: boolean;
};

export const StIconEdit = styled(IconEdit)<IconButtonProps>`
  color: ${colors.white};
  width: 34px;
  height: 48px;
  padding: 12px 10px 12px 0;
  box-sizing: border-box;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;

export const StIconTrash = styled(IconTrash)<IconButtonProps>`
  color: ${colors.white};
  width: 34px;
  height: 48px;
  padding: 12px 10px 12px 0;
  box-sizing: border-box;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'default' : 'pointer')};
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.5 : 1)};
`;

export const StEmptyNewsContent = styled.span`
  width: 100%;
  min-width: 0;
  padding: 11px 16px;
  box-sizing: border-box;
  border-radius: 10px;
  color: ${colors.gray300};
  background-color: ${colors.gray800};
  ${fontsObject.BODY_2_16_M};
`;

export const StNewsContent = styled.span`
  width: 100%;
  min-width: 0;
  padding: 11px 16px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: ${colors.gray800};
  ${fontsObject.BODY_2_16_M};
`;

export const StNewsSectionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: start;
`;

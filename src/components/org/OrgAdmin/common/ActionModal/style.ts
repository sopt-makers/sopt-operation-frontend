import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';
import { Button } from '@sopt-makers/ui';

import { ActionModalVariant } from '@/components/org/OrgAdmin/common/ActionModal';

export const StModalContainer = styled.div`
  display: flex;
  width: 400px;
  flex-direction: column;
  gap: 36px;
  padding: 24px;
`;

export const StModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  & > h2 {
    ${fontsObject.TITLE_4_20_SB};
    color: ${colors.gray10};
  }

  & > p {
    ${fontsObject.BODY_2_16_R};
    color: ${colors.gray100};
    white-space: pre-line;
  }
`;

export const StModalBtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`;

export const StLeftButton = styled(Button)`
  background-color: ${colors.gray700};
  color: ${colors.white};

  &:hover {
    background-color: ${colors.gray600};
  }

  &:active {
    background-color: ${colors.gray500};
  }
`;

const RIGHT_BUTTON_COLOR_MAP: Record<
  ActionModalVariant,
  {
    color: string;
    hoverColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    activeBackgroundColor: string;
  }
> = {
  default: {
    color: colors.black,
    hoverColor: colors.black,
    backgroundColor: colors.white,
    hoverBackgroundColor: colors.gray50,
    activeBackgroundColor: colors.gray100,
  },
  danger: {
    color: colors.white,
    hoverColor: colors.white,
    backgroundColor: colors.error,
    hoverBackgroundColor: colors.red500,
    activeBackgroundColor: colors.red600,
  },
};

export const StRightButton = styled(Button)<{
  btntype: ActionModalVariant;
}>`
  color: ${({ btntype }) => RIGHT_BUTTON_COLOR_MAP[btntype].color};

  background-color: ${({ btntype }) =>
    RIGHT_BUTTON_COLOR_MAP[btntype].backgroundColor};

  &:hover {
    color: ${({ btntype }) => RIGHT_BUTTON_COLOR_MAP[btntype].hoverColor};
    background-color: ${({ btntype }) =>
      RIGHT_BUTTON_COLOR_MAP[btntype].hoverBackgroundColor};
  }

  &:active {
    background-color: ${({ btntype }) =>
      RIGHT_BUTTON_COLOR_MAP[btntype].activeBackgroundColor};
  }

  &:disabled {
    cursor: default;
  }
`;

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

export const FloatingButton = styled.button<{
  isAlarmOptionButtonListOpen: boolean;
}>`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  right: 6rem;
  bottom: 6rem;
  width: 16rem;
  height: 5.6rem;
  border-radius: 18px;
  z-index: 12;
  background-color: ${({ isAlarmOptionButtonListOpen }) =>
    isAlarmOptionButtonListOpen ? colors.gray500 : colors.white};
  color: ${({ isAlarmOptionButtonListOpen }) =>
    isAlarmOptionButtonListOpen ? colors.white : colors.black};
  ${fontsObject.HEADING_6_18_B}
`;

export const IconWrapper = styled.div`
  width: 2.4rem;
  height: 2.4rem;
`;

export const AlarmOptionButtonListBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 15, 18, 0.8);
  z-index: 11;
`;

export const AlarmOptionButtonList = styled.ul`
  position: fixed;
  right: 6rem;
  bottom: 13.7rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 16rem;
  height: 12.8rem;
  padding: 0.6rem;
  border-radius: 18px;
  background-color: ${colors.white};
  z-index: 1;
`;

export const AlarmOptionButton = styled.button<{
  isSelected: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;

  width: 100%;
  height: 5.6rem;

  border-radius: 12px;

  ${fontsObject.HEADING_6_18_B}

  background-color: ${({ isSelected }) =>
    isSelected ? colors.gray100 : colors.white};

  &:hover {
    background-color: ${colors.gray100};
  }
`;

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fonts } from '@sopt-makers/fonts';

import zIndex from '@/utils/zIndex';

export const StSelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StSelect = styled.button<{
  value: ATTEND_STATUS | ATTEND_STATUS_KR;
}>`
  ${fonts.BODY_14_M}
  display: flex;
  align-items: center;
  padding: 3.5px 8px 3.5px 12px;
  gap: 12px;
  border-radius: 8px;
  background-color: ${({ value }) => getAttendanceColor(value).background};
  margin-right: 20px;

  p {
    color: ${({ value }) => getAttendanceColor(value).font};
  }
  svg {
    margin-left: 12px;
  }
  path {
    fill: ${({ value }) => getAttendanceColor(value).font};
  }
`;
export const StOptions = styled.ul`
  z-index: ${zIndex.select};
  position: absolute;
  transform: translateY(6.5rem);
  background-color: ${({ theme }) => theme.color.grayscale.realwhite};
  border-radius: 1rem;
  padding: 0.7rem;
  box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.1);
  animation: appear 0.6s;
  li {
    border-radius: 0.6rem;
    padding: 0.9rem 1.7rem;
    &:hover {
      background-color: ${({ theme }) => theme.color.grayscale.gray20};
      cursor: pointer;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(5.5rem);
    }
    to {
      opacity: 1;
      transform: translateY(6.5rem);
    }
  }
`;

const getAttendanceColor = (value: ATTEND_STATUS | ATTEND_STATUS_KR) => {
  switch (value) {
    case 'ABSENT':
    case '결석':
      return { font: colors.red300, background: colors.red800 };
    case 'TARDY':
    case '지각':
      return { font: colors.attention, background: colors.yellow900 };
    case 'ATTENDANCE':
    case '출석':
      return { font: colors.information, background: colors.green900 };
    default:
      return { font: colors.gray10, background: colors.gray600 };
  }
};

import styled from '@emotion/styled';
import { colors } from '@sopt-makers/colors';
import { fontsObject } from '@sopt-makers/fonts';

import zIndex from '@/utils/zIndex';

export const StSelectWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const StSelect = styled.button<{
  value: ATTEND_STATUS | ATTEND_STATUS_KR;
}>`
  ${fontsObject.BODY_3_14_M}
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
  ${fontsObject.BODY_3_14_M}

  z-index: ${zIndex.select};
  position: absolute;
  transform: translate(-1rem, 6.2rem);

  background-color: ${colors.gray600};
  box-shadow: 0px 5px 20px 0px rgba(0, 0, 0, 0.1);
  border-radius: 13px;
  padding: 8px 6px;
  animation: appear 0.6s;

  li {
    padding: 5px 21px 5px 9px;
    border: none;
    border-radius: 0.6rem;
    color: ${colors.gray10};
    background-color: ${colors.gray600};

    &:hover {
      background-color: ${colors.gray500};
      cursor: pointer;
    }
  }

  @keyframes appear {
    from {
      opacity: 0;
      transform: translate(-1rem, 5.2rem);
    }
    to {
      opacity: 1;
      transform: translate(-1rem, 6.2rem);
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

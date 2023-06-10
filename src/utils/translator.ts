import theme from '@/styles/theme';

export const partList: PART[] = [
  'ALL',
  'PLAN',
  'DESIGN',
  'SERVER',
  'IOS',
  'ANDROID',
  'WEB',
];
export const partTranslator: Record<PART, string> = {
  ALL: '전체',
  PLAN: '기획',
  DESIGN: '디자인',
  SERVER: '서버',
  IOS: 'iOS',
  ANDROID: 'AOS',
  WEB: '웹',
};
export const attendanceTranslator: Record<ATTEND_STATUS, string> = {
  ATTENDANCE: '출석',
  TARDY: '지각',
  ABSENT: '결석',
};
export const getAttendanceColor = (
  selected: ATTEND_STATUS | ATTEND_STATUS_KR,
) => {
  switch (selected) {
    case 'ABSENT':
    case '결석':
      return theme.color.sub.red;
    case 'TARDY':
    case '지각':
      return theme.color.sub.yellow;
    case 'ATTENDANCE':
    case '출석':
      return theme.color.sub.green;
    default:
      return theme.color.grayscale.black40;
  }
};

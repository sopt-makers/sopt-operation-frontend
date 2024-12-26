export const partList: PART[] = [
  'ALL',
  'PLAN',
  'DESIGN',
  'SERVER',
  'IOS',
  'ANDROID',
  'WEB',
];
export const allPartTranslator: Record<PART, string> = {
  ALL: '전체 파트',
  PLAN: '기획',
  DESIGN: '디자인',
  SERVER: '서버',
  IOS: 'iOS',
  ANDROID: '안드로이드',
  WEB: '웹',
};
export const partTranslator: Record<PART, string> = {
  ALL: '전체',
  PLAN: '기획',
  DESIGN: '디자인',
  SERVER: '서버',
  IOS: 'iOS',
  ANDROID: '안드로이드',
  WEB: '웹',
};
export const attributeTranslator: Record<SESSION_TYPE, string> = {
  SEMINAR: '세미나',
  EVENT: '행사',
  ETC: '기타',
};
export const attendanceTranslator: Record<ATTEND_STATUS, string> = {
  ATTENDANCE: '출석',
  TARDY: '지각',
  ABSENT: '결석',
};
export const alarmStatusTranslator: Record<ALARM_STATUS, string> = {
  ALL: '전체',
  SCHEDULED: '발송 예약',
  COMPLETED: '발송 완료',
};
export const targetTypeTranslator: Record<TARGET_TYPE, string> = {
  ACTIVE: '활동 회원',
  INACTIVE: '비활동 회원',
  CSV: 'CSV 첨부',
};

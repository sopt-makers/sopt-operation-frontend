import CountTag from '@/components/bannerAdmin/CountTag/CountTag';
import { ReactNode } from 'react';
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

export const bannerStatusTranslator: (
  bannerList: Banner[],
) => Record<BANNER_STATUS, ReactNode> = (bannerList) => {
  return {
    ALL: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
        전체
        <CountTag status="ALL">{bannerList.length}</CountTag>
      </div>
    ),
    RESERVED: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
        진행 예정
        <CountTag status="RESERVED">{bannerList.length}</CountTag>
      </div>
    ),
    IN_PROGRESS: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
        진행 중<CountTag status="IN_PROGRESS">{bannerList.length}</CountTag>
      </div>
    ),
    DONE: (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
        }}>
        진행 완료
        <CountTag status="DONE">{bannerList.length}</CountTag>
      </div>
    ),
  };
};

export const targetTypeTranslator: Record<TARGET_TYPE, string> = {
  ALL: '전체',
  ACTIVE: '활동 회원',
  CSV: 'CSV 첨부',
};

export const VALIDATION_CHECK = {
  required: {
    errorText: '필수 입력값이에요.',
  },
  generation: {
    pattern: /^[0-9]+$/,
    maxLength: 2,
    minLength: 2,
    errorText: '잘못된 기수예요.',
    wrongLengthErrorText: '2자리 수만 입력 가능해요.',
  },
  name: {
    maxLength: 20,
    errorText: '잘못된 기수명이에요.',
    wrongLengthErrorText() {
      return `최대 ${this.maxLength}까지 입력할 수 있어요.`;
    },
  },
};

export const ORG_ADMIN_LIST: ORG_ADMIN[] = ['공통', '홈', '소개', '모집안내'];

export const orgAdminList: ORG_ADMIN[] = ['공통', '홈', '소개', '모집안내'];

export const 임원진_LIST = [
  '회장',
  '부회장',
  '총무',
  '아트디렉터',
  '미디어 팀장',
  '메이커스 팀장',
] as const;

// utils/session/partList와 순서 달라서 분리
export type PART_KO = '기획' | '디자인' | '안드로이드' | 'iOS' | '웹' | '서버';

export const PART_LIST: PART_KO[] = [
  '기획',
  '디자인',
  '안드로이드',
  'iOS',
  '웹',
  '서버',
] as const;

// 모집안내 탭 FAQ 파트별 질문 최대 개수
export const FAQ_MAX_QUESTION_COUNT = 10;
export const FAQ_DEFAULT_QUESTION_COUNT = 1;

export type EXEC_TYPE =
  | (typeof 임원진_LIST)[number]
  | (typeof PART_LIST)[number];

export const SCHEDULE_FIELDS = {
  OB: {
    application: [
      {
        id: 'recruitSchedule.OB.applicationStartTime',
        label: 'OB 서류 접수 시작',
      },
      {
        id: 'recruitSchedule.OB.applicationEndTime',
        label: 'OB 서류 접수 마감',
      },
      {
        id: 'recruitSchedule.OB.applicationResultTime',
        label: 'OB 서류 결과 발표',
      },
    ],
    interview: [
      {
        id: 'recruitSchedule.OB.interviewStartTime',
        label: 'OB 면접 시작',
      },
      {
        id: 'recruitSchedule.OB.interviewEndTime',
        label: 'OB 면접 마감',
      },
    ],
    final: [
      {
        id: 'recruitSchedule.OB.finalResultTime',
        label: 'OB 최종 결과 발표',
      },
    ],
  },
  YB: {
    application: [
      {
        id: 'recruitSchedule.YB.applicationStartTime',
        label: 'YB 서류 접수 시작',
      },
      {
        id: 'recruitSchedule.YB.applicationEndTime',
        label: 'YB 서류 접수 마감',
      },
      {
        id: 'recruitSchedule.YB.applicationResultTime',
        label: 'YB 서류 결과 발표',
      },
    ],
    interview: [
      {
        id: 'recruitSchedule.YB.interviewStartTime',
        label: 'YB 면접 시작',
      },
      {
        id: 'recruitSchedule.YB.interviewEndTime',
        label: 'YB 면접 마감',
      },
    ],
    final: [
      {
        id: 'recruitSchedule.YB.finalResultTime',
        label: 'YB 최종 결과 발표',
      },
    ],
  },
};

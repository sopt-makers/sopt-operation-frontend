import { ISendPartOptions, ISendTargetOptions } from './type';
import {
  AttachOptionType,
  requestTargetType,
  SendPartType,
  SendTargetType,
} from './type';

export const partMap: Record<SendPartType, PART> = {
  전체: 'ALL',
  기획: 'PLAN',
  디자인: 'DESIGN',
  서버: 'SERVER',
  iOS: 'IOS',
  안드로이드: 'ANDROID',
  웹: 'WEB',
  '': 'ALL',
};

export const targetTypeMap: Record<SendTargetType, requestTargetType> = {
  전체: 'ALL',
  '활동 회원': 'ACTIVE',
  'CSV 첨부': 'CSV',
};

export const linkTypeMap: Record<AttachOptionType, LINK_TYPE> = {
  '웹 링크': 'WEB',
  '앱 내 딥링크': 'APP',
  '기타 딥링크': 'APP',
};

export const targetOptions: ISendTargetOptions[] = [
  {
    label: '활동 회원',
    value: '활동 회원',
  },
  {
    label: 'CSV 첨부',
    value: 'CSV 첨부',
  },
];

export const partOptions: ISendPartOptions[] = [
  {
    label: '전체',
    value: '전체',
  },
  {
    label: '기획',
    value: '기획',
  },
  {
    label: '디자인',
    value: '디자인',
  },
  {
    label: '서버',
    value: '서버',
  },
  {
    label: 'iOS',
    value: 'iOS',
  },
  {
    label: '안드로이드',
    value: '안드로이드',
  },
  {
    label: '웹',
    value: '웹',
  },
];

export const deepLinkOptions = [
  {
    label: '홈',
    value: 'home',
  },
  {
    label: '홈-알림 리스트',
    value: 'home/notification',
  },
  {
    label: '홈-마이페이지',
    value: 'home/mypage',
  },
  {
    label: '홈-출석',
    value: 'home/attendance',
  },
  {
    label: '홈-솝탬프(전체미션)',
    value: 'home/soptamp',
  },
  {
    label: '홈-솝탬프(전체랭킹)',
    value: 'home/soptamp/entire-ranking',
  },
  {
    label: '홈-콕 찌르기',
    value: 'home/poke',
  },
  {
    label: '홈-솝마디',
    value: 'home/fortune',
  },
];

export const timeOptions = [
  { label: '00:00', value: '00:00' },
  { label: '00:30', value: '00:30' },
  { label: '01:00', value: '01:00' },
  { label: '01:30', value: '01:30' },
  { label: '02:00', value: '02:00' },
  { label: '02:30', value: '02:30' },
  { label: '03:00', value: '03:00' },
  { label: '03:30', value: '03:30' },
  { label: '04:00', value: '04:00' },
  { label: '04:30', value: '04:30' },
  { label: '05:00', value: '05:00' },
  { label: '05:30', value: '05:30' },
  { label: '06:00', value: '06:00' },
  { label: '06:30', value: '06:30' },
  { label: '07:00', value: '07:00' },
  { label: '07:20', value: '07:30' },
  { label: '08:00', value: '08:00' },
  { label: '08:30', value: '08:30' },
  { label: '09:00', value: '09:00' },
  { label: '09:30', value: '09:30' },
  { label: '10:00', value: '10:00' },
  { label: '10:30', value: '10:30' },
  { label: '11:00', value: '11:00' },
  { label: '11:30', value: '11:30' },
  { label: '12:00', value: '12:00' },
  { label: '12:30', value: '12:30' },
  { label: '13:00', value: '13:00' },
  { label: '13:30', value: '13:30' },
  { label: '14:00', value: '14:00' },
  { label: '14:30', value: '14:30' },
  { label: '15:00', value: '15:00' },
  { label: '15:30', value: '15:30' },
  { label: '16:00', value: '16:00' },
  { label: '16:30', value: '16:30' },
  { label: '17:00', value: '17:00' },
  { label: '17:30', value: '17:30' },
  { label: '18:00', value: '18:00' },
  { label: '18:30', value: '18:30' },
  { label: '19:00', value: '19:00' },
  { label: '19:30', value: '19:30' },
  { label: '20:00', value: '20:00' },
  { label: '20:30', value: '20:30' },
  { label: '21:00', value: '21:00' },
  { label: '21:30', value: '21:30' },
  { label: '22:00', value: '22:00' },
  { label: '22:30', value: '22:30' },
  { label: '23:00', value: '23:00' },
  { label: '23:30', value: '23:30' },
];

export const bannedTimeList = [
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
  '00:00',
  '00:30',
  '01:00',
  '01:30',
  '02:00',
  '02:30',
  '03:00',
  '03:30',
  '04:00',
  '04:30',
  '05:00',
  '05:30',
  '06:00',
  '06:30',
  '07:00',
  '07:30',
];

// 예약 날짜 포맷 변환 함수 (Date 객체에서 연월일 파싱해서 문자열로 반환)
export const formatDate = (date: Date | null) => {
  if (!date) return '날짜 선택';
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

import { ISendPartOptions, ISendTargetOptions } from './type';
import {
  AttachOptionType,
  requestLinkType,
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

export const linkTypeMap: Record<AttachOptionType, requestLinkType> = {
  '첨부 안함': null,
  '웹 링크': 'WEB',
  '앱 내 딥링크': 'APP',
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
    label: '홈-출석',
    value: 'home/attendance',
  },
  {
    label: '플레이그라운드',
    value: 'https://playground.sopt.org/',
  },
  {
    label: '크루',
    value: 'https://playground.sopt.org/group',
  },
];

export const timeOptions = [
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
];

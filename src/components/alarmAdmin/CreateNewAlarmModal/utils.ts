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

export type SendTargetType = '전체' | '활동 회원' | 'CSV 첨부';
export type requestTargetType = 'ALL' | 'ACTIVE' | 'CSV';

export type AttachOptionType = '웹 링크' | '앱 내 딥링크' | '기타 딥링크';
export type requestLinkType = 'WEB' | 'APP' | null;

export interface ISendTargetOptions {
  label: SendTargetType;
  value: SendTargetType;
}

export type SendPartType =
  | '전체'
  | '기획'
  | '디자인'
  | '서버'
  | 'iOS'
  | '안드로이드'
  | '웹'
  | '';

export interface ISendPartOptions {
  label: SendPartType;
  value: SendPartType;
}

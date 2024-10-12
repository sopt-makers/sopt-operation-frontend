export type SendTargetType = '활동 회원' | 'CSV 첨부';

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

export type AttachOptionType = '첨부 안함' | '웹 링크' | '앱 내 딥링크';

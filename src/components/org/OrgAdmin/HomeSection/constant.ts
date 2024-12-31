export const NEWS = [
  { id: 1, title: 'Do SOPT OT' },
  { id: 2, title: 'SOPT effect : 창업가 초청 토크 세션' },
  { id: 3, title: '[매쉬업엔젤스 X SOPT] Open Office Hours' },
  { id: 4, title: 'MIND 23 : IT PEOPLE CONFERENCE' },
  { id: 5, title: 'DO SOPT 1차 행사' },
];

export const PARTS = [
  '기획',
  '디자인',
  '안드로이드',
  'iOS',
  '웹',
  '서버',
] as const;

export const PARTS_FILTER = {
  기획: 'pm',
  디자인: 'de',
  안드로이드: 'an',
  IOS: 'io',
  웹: 'we',
  서버: 'sv',
} as const;

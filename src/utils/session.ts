export const sessionType = [
  {
    session: '세미나',
    desc: '미 출석시 출석점수 감점',
  },
  {
    session: '행사',
    desc: '출석 시 0.5점 부여',
  },
  {
    session: '기타',
    desc: '출석 점수 미반영',
  },
];

export const partList = [
  '전체',
  '기획',
  '디자인',
  '서버',
  'IOS',
  '안드로이드',
  '웹',
];

export const times: string[] = [];

for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : `${i}`;
  times.push(`${hour}:00`);
}

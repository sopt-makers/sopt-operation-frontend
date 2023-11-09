export const attributeList: string[] = ['세미나', '행사', '기타'];

export const sessionTranslator: Record<string, SESSION_TYPE> = {
  세미나: 'SEMINAR',
  행사: 'EVENT',
  기타: 'ETC',
};

export const partList = [
  '전체',
  '기획',
  '디자인',
  '서버',
  'iOS',
  '안드로이드',
  '웹',
];

export const partTranslator: Record<string, PART> = {
  전체: 'ALL',
  기획: 'PLAN',
  디자인: 'DESIGN',
  서버: 'SERVER',
  iOS: 'IOS',
  안드로이드: 'ANDROID',
  웹: 'WEB',
};

export const getPartValue = (obj: Record<string, PART>, value: string) => {
  return Object.keys(obj).find((key) => obj[key] === value);
};

export const times: string[] = [];

for (let i = 0; i < 24; i++) {
  const hour = i < 10 ? `0${i}` : `${i}`;
  times.push(`${hour}:00`);
  times.push(`${hour}:30`);
}

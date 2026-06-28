import { type EXEC_TYPE, PART_LIST, 임원진_LIST } from '@/utils/org';

export const EXEC_ROLE_LIST: EXEC_TYPE[] = [...임원진_LIST, ...PART_LIST];

// API의 member.role은 파트장 직책에 ' 파트장'을 붙여서 내려온다.
// (ex. PART_LIST의 '기획' -> API role '기획 파트장')
// 폼 필드 키(EXEC_TYPE)는 접미사 없는 짧은 값을 쓰므로 양방향 변환이 필요하다.
export const toMemberRole = (execType: EXEC_TYPE): string =>
  (PART_LIST as readonly string[]).includes(execType)
    ? `${execType} 파트장`
    : execType;

export const fromMemberRole = (role: string): EXEC_TYPE | undefined => {
  const partMatch = PART_LIST.find((part) => `${part} 파트장` === role);
  if (partMatch) return partMatch;

  if ((임원진_LIST as readonly string[]).includes(role)) {
    return role as EXEC_TYPE;
  }

  return undefined;
};

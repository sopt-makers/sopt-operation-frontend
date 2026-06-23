const isValidHexColor = (hex: string) => {
  const hexRegex = /^([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/;
  return hexRegex.test(hex);
};

export const expandHexColor = (hex: string) => {
  if (!isValidHexColor(hex)) return '#ffffff';

  if (hex.length === 3) {
    return `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }

  return `#${hex}`;
};

export const stripHexHash = (hex: string | undefined) =>
  (hex ?? '').replace(/^#/, '');

/** API는 `#RRGGBB` 6자리만 허용해서, 폼이 허용하는 8자리(알파) 입력은 잘라낸다. */
export const toApiHexColor = (hex: string) => {
  const expanded = expandHexColor(hex);
  return expanded.length > 7 ? expanded.slice(0, 7) : expanded;
};

export const SCHEDULE_TIME_FIELDS = [
  'applicationStartTime',
  'applicationEndTime',
  'applicationResultTime',
  'interviewStartTime',
  'interviewEndTime',
  'finalResultTime',
] as const;

/** API가 내려주는 'yyyy-MM-dd HH:mm:ss' 또는 'yyyy-MM-ddTHH:mm[:ss]' 문자열을 datetime-local 입력값으로 정규화한다. */
export const fromApiDateTime = (apiValue: string) => {
  if (!apiValue) return '';

  return apiValue.replace(' ', 'T').slice(0, 16);
};

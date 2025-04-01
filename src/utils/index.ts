export const precision = (num: number, precisionNum: number) => {
  const numToString = num + '';
  const numLength = numToString.length;

  if (numLength > 2) return num;
  return '0'.repeat(precisionNum - numLength) + numToString;
};

export const addPlus = (num: number) => (num < 0 ? num : `+${num}`);

export const buildQuery = (
  queries: Record<string, string | undefined | null>,
): string => {
  const query = new URLSearchParams();

  Object.entries(queries).forEach(([key, value]) => {
    value && query.append(key, value);
  });

  return query.toString() ? `?${query.toString()}` : '';
};

export const getQuery = (url: string, key: string) => {
  const queryString = `?${url?.split('?')[1]}`;
  const params = new URLSearchParams(queryString);

  return params.get(key) || undefined;
};

export const getTagColor = (location: string) => {
  if (location === '플그 커뮤니티') return 'rgba(88, 207, 5, 0.5)';
  if (location === '크루 전체모임') return 'rgba(0, 174, 255, 0.50)';
  if (location === '크루 모임피드') return 'rgba(250, 115, 227, 0.50)';

  return 'rgba(88, 207, 5, 0.5)';
};

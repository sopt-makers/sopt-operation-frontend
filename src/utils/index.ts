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

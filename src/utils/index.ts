export const precision = (num: number, precisionNum: number) => {
  const numToString = num + '';
  const numLength = numToString.length;

  if (numLength > 2) return num;
  return '0'.repeat(precisionNum - numLength) + numToString;
};

export const addPlus = (num: number) => (num < 0 ? num : `+${num}`);

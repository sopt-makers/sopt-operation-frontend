export const precision = (num: number, precisionNum: number) => {
  const numToString = num + '';
  const numLength = numToString.length;
  return '0'.repeat(precisionNum - numLength) + numToString;
};

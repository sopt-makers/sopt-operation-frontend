import dayjs from 'dayjs';

type FormatType = 'date' | 'time';

export const transDate = (
  date: string | undefined,
  type: FormatType,
): string => {
  const dayjsTranslator = dayjs(date);
  switch (type) {
    case 'date':
      return dayjsTranslator.format('YYYY/MM/DD');
    case 'time':
      return dayjsTranslator.format('HH:mm');
    default:
      throw new Error(`Unsupported type: ${type}`);
  }
};

export const replaceDateFormat = (date: string) => {
  return date.replace(/-/g, '.');
};

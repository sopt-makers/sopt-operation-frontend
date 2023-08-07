import dayjs from 'dayjs';

type FormatType = 'date' | 'time';

export const useDateFormat = (
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

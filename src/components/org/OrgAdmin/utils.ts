import type { FieldValues } from 'react-hook-form';

import { VALIDATION_CHECK } from '@/utils/org';

import type { Group } from './types';

export const validationCommonInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setGroup: (group: Group) => void,
) => {
  const { generation, name, recruitSchedule, brandingColor } = getValues();

  const fieldsToValidate = [
    { name: 'generation', value: generation },
    { name: 'name', value: name },
    ...['OB', 'YB'].flatMap((group) =>
      [
        'applicationStartTime',
        'applicationEndTime',
        'applicationResultTime',
        'interviewStartTime',
        'interviewEndTime',
        'finalResultTime',
      ].map((time) => ({
        name: `recruitSchedule.${group}.${time}`,
        value: recruitSchedule?.[group]?.[time],
      })),
    ),
    ...['main', 'low', 'high', 'point'].map((color) => ({
      name: `brandingColor.${color}`,
      value: brandingColor?.[color],
    })),
  ];

  let isAllFilled = true;

  for (const { name, value } of fieldsToValidate) {
    if (!value) {
      isAllFilled = false;

      setError(name, {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });

      if (name.includes('YB')) setGroup('YB');
      else if (name.includes('OB')) setGroup('OB');

      break;
    }
  }

  return isAllFilled;
};

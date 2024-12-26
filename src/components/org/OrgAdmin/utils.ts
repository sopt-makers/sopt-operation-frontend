import type { FieldValues } from 'react-hook-form';

import {
  type EXEC_TYPE,
  type PART_KO,
  PART_LIST,
  VALIDATION_CHECK,
  임원진_LIST,
} from '@/utils/org';

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

export const validationAboutInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setSelectedPartInHomeTap: (part: PART_KO) => void,
  setSelectedExec: (member: EXEC_TYPE) => void,
) => {
  const {
    headerImageFileName,
    coreValue1,
    coreValue2,
    coreValue3,
    partCurriculum,
    member,
  } = getValues();

  const fieldsToValidate = [
    { name: 'headerImageFileName', value: headerImageFileName },
    ...[coreValue1, coreValue2, coreValue3].flatMap((coreValue, idx) =>
      ['imageFileName', 'value', 'description'].map((key) => ({
        name: `coreValue${idx + 1}.${key}`,
        value: coreValue?.[key],
      })),
    ),
    ...PART_LIST.flatMap((part) =>
      Array.from({ length: 8 }).map((_, idx) => ({
        name: `partCurriculum.${part}.${idx}`,
        value: partCurriculum?.[part]?.[idx],
      })),
    ),
    ...[...임원진_LIST, ...PART_LIST].flatMap((item) =>
      ['profileImageFileName', 'name', 'introduction'].map((key) => ({
        name: `member.${item}.${key}`,
        value: member?.[item]?.[key],
      })),
    ),
  ];

  let isAllFilled = true;

  for (const { name, value } of fieldsToValidate) {
    if (!value) {
      isAllFilled = false;

      setError(name, {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });

      if (name.includes('partCurriculum'))
        setSelectedPartInHomeTap(name.split('.')[1] as PART_KO);
      else if (name.includes('member'))
        setSelectedExec(name.split('.')[1] as EXEC_TYPE);

      break;
    }
  }

  return isAllFilled;
};

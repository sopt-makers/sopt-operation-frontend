import type { FieldValues } from 'react-hook-form';

import { type PART_KO, PART_LIST, VALIDATION_CHECK } from '@/utils/org';

import { BRANDING_COLOR_FIELD_IDS } from './CommonSection/BrandingColor';
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
    ...Object.keys(BRANDING_COLOR_FIELD_IDS).map((color) => ({
      name: `brandingColor.${color}`,
      value: brandingColor?.[color],
    })),
  ];

  for (const { name, value } of fieldsToValidate) {
    if (!value) {
      setError(name, {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });

      if (name.includes('YB')) setGroup('YB');
      else if (name.includes('OB')) setGroup('OB');

      return false;
    }
  }

  return true;
};

export const validationHomeInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  onChangeIntroPart: (part: PART_KO) => void,
) => {
  for (const part of PART_LIST) {
    const name = `partIntroduction${part}`;
    const data = getValues(name);
    if (!data) {
      setError(name, {
        type: 'required',
        message: VALIDATION_CHECK.required.errorText,
      });
      onChangeIntroPart(part);
      return false;
    }
  }
  return true;
};

export const validationAboutInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
) => {
  const { headerImageFileName, coreValue1, coreValue2, coreValue3 } =
    getValues();

  const fieldsToValidate = [
    { name: 'headerImageFileName', value: headerImageFileName },
    ...[coreValue1, coreValue2, coreValue3].flatMap((coreValue, idx) =>
      ['imageFileName', 'value', 'description', 'detailDescription'].map(
        (key) => ({
          name: `coreValue${idx + 1}.${key}`,
          value: coreValue?.[key],
        }),
      ),
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

      break;
    }
  }

  return isAllFilled;
};

export const validationRecruitInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setCurriculumPart: (curriculumPart: PART_KO) => void,
  setFnaPart: (fnaPart: PART_KO) => void,
) => {
  const { recruitHeaderImage, recruitPartCurriculum, recruitQuestion } =
    getValues();

  const fieldsToValidate = [
    { name: 'recruitHeaderImage', value: recruitHeaderImage },
    ...PART_LIST.flatMap((part) =>
      ['content', 'preference'].map((item) => ({
        name: `recruitPartCurriculum.${part}.${item}`,
        value: recruitPartCurriculum?.[part]?.[item],
      })),
    ),
    ...PART_LIST.flatMap((part) =>
      [
        'answer0',
        'answer1',
        'answer2',
        'question0',
        'question1',
        'question2',
      ].map((item) => ({
        name: `recruitQuestion.${part}.${item}`,
        value: recruitQuestion?.[part]?.[item],
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

      if (name.includes('recruitPartCurriculum'))
        setCurriculumPart(name.split('.')[1] as PART_KO);
      if (name.includes('recruitQuestion'))
        setFnaPart(name.split('.')[1] as PART_KO);

      break;
    }
  }

  return isAllFilled;
};

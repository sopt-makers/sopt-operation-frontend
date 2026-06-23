import type { FieldValues, UseFormSetValue } from 'react-hook-form';

import type {
  AddAdminBrandingColorRequestDto,
  AddAdminRecruitScheduleRequestDto,
} from '@/__generated__/org-types/data-contracts';

import {
  fromApiDateTime,
  SCHEDULE_TIME_FIELDS,
  stripHexHash,
  toApiHexColor,
} from './utils';

type AdminCommonData = {
  generation?: number;
  name?: string;
  recruitSchedule?: {
    type?: 'OB' | 'YB';
    schedule?: Partial<Record<(typeof SCHEDULE_TIME_FIELDS)[number], string>>;
  }[];
  brandingColor?: {
    darkModeKeyColor?: string;
    darkModeTextColor?: string;
    lightModeKeyColor?: string;
    lightModeTextColor?: string;
  };
};

const setValueOptions = { shouldDirty: false, shouldValidate: false };

export const syncCommonFormFromAdminData = (
  data: AdminCommonData | undefined,
  setValue: UseFormSetValue<FieldValues>,
) => {
  if (!data) return;

  setValue(
    'generation',
    data.generation ? String(data.generation) : '',
    setValueOptions,
  );
  setValue('name', data.name ?? '', setValueOptions);

  data.recruitSchedule?.forEach(({ type, schedule }) => {
    if (!type || !schedule) return;

    SCHEDULE_TIME_FIELDS.forEach((field) => {
      const value = schedule[field];

      setValue(
        `recruitSchedule.${type}.${field}`,
        value ? fromApiDateTime(value) : '',
        setValueOptions,
      );
    });
  });

  if (data.brandingColor) {
    setValue(
      'brandingColor.darkKeyColor',
      stripHexHash(data.brandingColor.darkModeKeyColor),
      setValueOptions,
    );
    setValue(
      'brandingColor.darkTextOnColor',
      data.brandingColor.darkModeTextColor,
      setValueOptions,
    );
    setValue(
      'brandingColor.lightKeyColor',
      stripHexHash(data.brandingColor.lightModeKeyColor),
      setValueOptions,
    );
    setValue(
      'brandingColor.lightTextOnColor',
      data.brandingColor.lightModeTextColor,
      setValueOptions,
    );
  }
};

export const buildRecruitScheduleFromForm = (
  values: FieldValues,
): AddAdminRecruitScheduleRequestDto[] =>
  (['OB', 'YB'] as const).map((type) => {
    const schedule = values.recruitSchedule?.[type] ?? {};

    return {
      type,
      // API는 'yyyy-MM-ddTHH:mm' 같은 타임존 없는 로컬 문자열만 허용한다.
      // datetime-local 입력값이 이미 이 형식이라 그대로 보낸다.
      // (UTC로 변환해서 보내면 백엔드가 형식 검증에서 reject한다.)
      schedule: SCHEDULE_TIME_FIELDS.reduce(
        (acc, field) => ({
          ...acc,
          [field]: schedule[field] ?? '',
        }),
        {} as AddAdminRecruitScheduleRequestDto['schedule'],
      ),
    };
  });

export const buildBrandingColorFromForm = (
  values: FieldValues,
): AddAdminBrandingColorRequestDto => ({
  darkModeKeyColor: toApiHexColor(values.brandingColor?.darkKeyColor ?? ''),
  darkModeTextColor: values.brandingColor?.darkTextOnColor,
  lightModeKeyColor: toApiHexColor(values.brandingColor?.lightKeyColor ?? ''),
  lightModeTextColor: values.brandingColor?.lightTextOnColor,
});

import type { FieldValues } from 'react-hook-form';

import { type PART_KO, PART_LIST, VALIDATION_CHECK } from '@/utils/org';

import { EXEC_ROLE_LIST, toMemberRole } from './AboutSection/memberRole';
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
  existingHeaderImageUrl?: string,
  existingCoreValues?: { image?: string }[],
  existingMembers?: { role: string; profileImage?: string }[],
) => {
  const { headerImageFileName, coreValue1, coreValue2, coreValue3 } =
    getValues();

  // 이미지 드롭존은 새 파일을 올렸을 때만 폼 값이 채워진다.
  // 기존에 등록된 이미지를 그대로 두면(미리보기로만 보여주고 폼 값은 비어있음)
  // existing*Url이 있어야 "채워졌다"고 판단할 수 있다.
  const fieldsToValidate = [
    {
      name: 'headerImageFileName',
      value: headerImageFileName?.fileName ?? existingHeaderImageUrl,
    },
    ...[coreValue1, coreValue2, coreValue3].flatMap((coreValue, idx) => [
      {
        name: `coreValue${idx + 1}.imageFileName`,
        value:
          coreValue?.imageFileName?.fileName ??
          existingCoreValues?.[idx]?.image,
      },
      ...['value', 'description', 'detailDescription'].map((key) => ({
        name: `coreValue${idx + 1}.${key}`,
        value: coreValue?.[key],
      })),
    ]),
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

  if (!isAllFilled) return false;

  // 이름을 채운 임원진만 실존 인물로 보고, 소속/소개/사진(새 파일 or 기존 이미지)을 요구한다.
  const { member } = getValues();

  for (const execType of EXEC_ROLE_LIST) {
    const memberValue = member?.[execType];
    if (!memberValue?.name) continue;

    const apiRole = toMemberRole(execType);
    const existingImage = existingMembers?.find(
      (m) => m.role === apiRole,
    )?.profileImage;

    const memberFieldsToValidate = [
      {
        name: `member.${execType}.affiliation`,
        value: memberValue.affiliation,
      },
      {
        name: `member.${execType}.introduction`,
        value: memberValue.introduction,
      },
      {
        name: `member.${execType}.profileImageFileName`,
        value: memberValue.profileImageFileName?.fileName ?? existingImage,
      },
    ];

    for (const { name, value } of memberFieldsToValidate) {
      if (!value) {
        setError(name, {
          type: 'required',
          message: VALIDATION_CHECK.required.errorText,
        });

        return false;
      }
    }
  }

  // 일정 행 중 날짜/세션 한쪽만 채워진 게 있으면 에러 처리한다(조용히 누락시키지 않는다).
  const { activitySchedule } = getValues();
  const scheduleRows = activitySchedule as
    | { date?: string; session?: string }[]
    | undefined;

  for (let index = 0; index < (scheduleRows?.length ?? 0); index += 1) {
    const row = scheduleRows?.[index];

    if (row?.date && !row?.session) {
      setError(`activitySchedule.${index}.session`, {
        type: 'required',
        message: '세션명을 입력해주세요.',
      });

      return false;
    }

    if (!row?.date && row?.session) {
      setError(`activitySchedule.${index}.date`, {
        type: 'required',
        message: '날짜를 입력해주세요.',
      });

      return false;
    }
  }

  // 일정은 16개 행이 모두 채워질 필요는 없고, 최소 1개 행(날짜+세션)만 있으면 된다.
  const hasAnySchedule = scheduleRows?.some((row) => row?.date && row?.session);

  if (!hasAnySchedule) {
    setError('activitySchedule.0.date', {
      type: 'required',
      message: '최소 1개 이상의 일정을 입력해주세요.',
    });

    return false;
  }

  return true;
};

export const validationRecruitInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setCurriculumPart: (curriculumPart: PART_KO) => void,
  setFnaPart: (fnaPart: PART_KO) => void,
) => {
  const { recruitPartCurriculum, recruitQuestion } = getValues();

  const fieldsToValidate = [
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

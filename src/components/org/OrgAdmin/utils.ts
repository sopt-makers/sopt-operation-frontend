import type { FieldValues } from 'react-hook-form';

import { CURRICULUM_WEEK_COUNT } from '@/components/org/OrgAdmin/RecruitSection/_constants/constants';
import {
  type EXEC_TYPE,
  FAQ_MAX_QUESTION_COUNT,
  type PART_KO,
  PART_LIST,
  VALIDATION_CHECK,
} from '@/utils/org';

import { EXEC_ROLE_LIST, toMemberRole } from './AboutSection/memberRole';
import { BRANDING_COLOR_FIELD_IDS } from './CommonSection/BrandingColor';
import type { Group } from './types';

export const validationCommonInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setFocus: (name: string) => void,
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

      requestAnimationFrame(() => setFocus(name));
      return false;
    }
  }

  return true;
};

export const validationHomeInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setFocus: (name: string) => void,
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
      requestAnimationFrame(() => setFocus(name));
      return false;
    }
  }
  return true;
};

export const validationAboutInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setFocus: (name: string) => void,
  onChangeSelectedExec: (execType: EXEC_TYPE) => void,
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
      requestAnimationFrame(() => setFocus(name));

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
        onChangeSelectedExec(execType);
        requestAnimationFrame(() => setFocus(name));

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
      const name = `activitySchedule.${index}.session`;
      setError(name, {
        type: 'required',
        message: '세션명을 입력해주세요.',
      });
      requestAnimationFrame(() => setFocus(name));

      return false;
    }

    if (!row?.date && row?.session) {
      const name = `activitySchedule.${index}.date`;
      setError(name, {
        type: 'required',
        message: '날짜를 입력해주세요.',
      });
      requestAnimationFrame(() => setFocus(name));

      return false;
    }
  }

  // 일정은 16개 행이 모두 채워질 필요는 없고, 최소 1개 행(날짜+세션)만 있으면 된다.
  const hasAnySchedule = scheduleRows?.some((row) => row?.date && row?.session);

  if (!hasAnySchedule) {
    const name = 'activitySchedule.0.date';
    setError(name, {
      type: 'required',
      message: '최소 1개 이상의 일정을 입력해주세요.',
    });
    requestAnimationFrame(() => setFocus(name));

    return false;
  }

  return true;
};

export const validationRecruitInputs = (
  getValues: (payload?: string | string[]) => FieldValues,
  setError: (name: string, error: { type: string; message: string }) => void,
  setFocus: (name: string) => void,
  onInvalidIntroPart: (introPart: PART_KO) => void,
  onInvalidCurriculumPart: (curriculumPart: PART_KO) => void,
  onInvalidFaqPart: (faqPart: PART_KO) => void,
) => {
  const values = getValues();
  const { partCurriculum, recruitPartCurriculum, recruitQuestion } = values;
  const setRequiredError = (name: string) => {
    setError(name, {
      type: 'required',
      message: VALIDATION_CHECK.required.errorText,
    });
  };
  const focusInvalidField = (
    name: string,
    selectPart: (part: PART_KO) => void,
    part: PART_KO,
  ) => {
    setRequiredError(name);
    selectPart(part);
    requestAnimationFrame(() => setFocus(name));
  };

  for (const part of PART_LIST) {
    const name = `partIntroduction${part}`;

    if (!values[name]) {
      focusInvalidField(name, onInvalidIntroPart, part);
      return false;
    }
  }

  for (const part of PART_LIST) {
    for (const item of ['content', 'preference'] as const) {
      const name = `recruitPartCurriculum.${part}.${item}`;
      const rawValue = recruitPartCurriculum?.[part]?.[item] ?? '';
      const value =
        item === 'preference' ? rawValue.replace(/\n/g, '').trim() : rawValue;

      if (!value) {
        focusInvalidField(name, onInvalidIntroPart, part);
        return false;
      }
    }
  }

  for (const part of PART_LIST) {
    for (let index = 0; index < CURRICULUM_WEEK_COUNT; index += 1) {
      const name = `partCurriculum.${part}.${index}`;

      if (!partCurriculum?.[part]?.[index]) {
        focusInvalidField(name, onInvalidCurriculumPart, part);
        return false;
      }
    }
  }

  for (const part of PART_LIST) {
    let hasCompletePair = false;
    const partQuestions = recruitQuestion?.[part];

    for (let index = 0; index < FAQ_MAX_QUESTION_COUNT; index += 1) {
      const questionName = `recruitQuestion.${part}.question${index}`;
      const answerName = `recruitQuestion.${part}.answer${index}`;
      const question = (partQuestions?.[`question${index}`] ?? '').trim();
      const answer = (partQuestions?.[`answer${index}`] ?? '').trim();

      if (!question && !answer) continue;

      if (!question) {
        focusInvalidField(questionName, onInvalidFaqPart, part);
        return false;
      }

      if (!answer) {
        focusInvalidField(answerName, onInvalidFaqPart, part);
        return false;
      }

      hasCompletePair = true;
    }

    if (!hasCompletePair) {
      focusInvalidField(
        `recruitQuestion.${part}.question0`,
        onInvalidFaqPart,
        part,
      );
      return false;
    }
  }

  return true;
};

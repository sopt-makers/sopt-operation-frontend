import type { FieldValues, UseFormSetValue } from 'react-hook-form';

import { fromMemberRole } from './memberRole';
import { FIRST_SCHEDULE_SESSION_NAME } from './scheduleConstants';

type AdminAboutMember = {
  role: string;
  name?: string;
  affiliation?: string;
  introduction?: string;
  sns?: {
    email?: string;
    linkedin?: string;
    github?: string;
    behance?: string;
  };
};

type AdminAboutCoreValue = {
  value?: string;
  description?: string;
  detailDescription?: string;
};

type AdminAboutSchedule = {
  name?: string;
  startDate?: string;
};

type AdminAboutData = {
  coreValue?: AdminAboutCoreValue[];
  member?: AdminAboutMember[];
  activitySchedule?: AdminAboutSchedule[];
};

const setValueOptions = { shouldDirty: false, shouldValidate: false };

const normalizeSessionName = (name?: string) => name?.trim().toUpperCase();

// (과거 데이터가 순서와 무관하게 저장됐을 가능성에 대비한 안전장치)
// 이름으로 못 찾으면 원래 순서를 그대로 두고, 이후 로직에서 0번째 행을 OT로 강제하는 걸로 폴백한다.
const reorderScheduleWithOtFirst = (
  schedule: AdminAboutSchedule[],
): AdminAboutSchedule[] => {
  const otIndex = schedule.findIndex(
    (item) => normalizeSessionName(item.name) === FIRST_SCHEDULE_SESSION_NAME,
  );

  if (otIndex <= 0) return schedule;

  const otEntry = schedule[otIndex];
  const rest = schedule.filter((_, index) => index !== otIndex);

  return [otEntry, ...rest];
};

export const syncAboutFormFromAdminData = (
  data: AdminAboutData | undefined,
  setValue: UseFormSetValue<FieldValues>,
) => {
  if (!data) return;

  data.coreValue?.forEach((coreValue, index) => {
    const fieldKey = `coreValue${index + 1}`;

    setValue(`${fieldKey}.value`, coreValue.value ?? '', setValueOptions);
    setValue(
      `${fieldKey}.description`,
      coreValue.description ?? '',
      setValueOptions,
    );
    setValue(
      `${fieldKey}.detailDescription`,
      coreValue.detailDescription ?? '',
      setValueOptions,
    );
  });

  data.member?.forEach(({ role, name, affiliation, introduction, sns }) => {
    const execType = fromMemberRole(role);
    if (!execType) return;

    setValue(`member.${execType}.name`, name ?? '', setValueOptions);
    setValue(
      `member.${execType}.affiliation`,
      affiliation ?? '',
      setValueOptions,
    );
    setValue(
      `member.${execType}.introduction`,
      introduction ?? '',
      setValueOptions,
    );
    setValue(`member.${execType}.sns.email`, sns?.email ?? '', setValueOptions);
    setValue(
      `member.${execType}.sns.linkedin`,
      sns?.linkedin ?? '',
      setValueOptions,
    );
    setValue(
      `member.${execType}.sns.github`,
      sns?.github ?? '',
      setValueOptions,
    );
    setValue(
      `member.${execType}.sns.behance`,
      sns?.behance ?? '',
      setValueOptions,
    );
  });

  const orderedSchedule = data.activitySchedule
    ? reorderScheduleWithOtFirst(data.activitySchedule)
    : undefined;

  orderedSchedule?.forEach(({ name, startDate }, index) => {
    setValue(
      `activitySchedule.${index}.date`,
      startDate ?? '',
      setValueOptions,
    );
    // 이름으로 OT를 못 찾아 재정렬되지 않았더라도, 0번째 행은 항상 OT로 고정한다(폴백).
    setValue(
      `activitySchedule.${index}.session`,
      index === 0 ? FIRST_SCHEDULE_SESSION_NAME : (name ?? ''),
      setValueOptions,
    );
  });
};

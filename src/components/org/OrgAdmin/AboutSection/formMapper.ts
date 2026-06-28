import type { FieldValues, UseFormSetValue } from 'react-hook-form';

import { fromMemberRole } from './memberRole';

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

  data.activitySchedule?.forEach(({ name, startDate }, index) => {
    setValue(
      `activitySchedule.${index}.date`,
      startDate ?? '',
      setValueOptions,
    );
    setValue(`activitySchedule.${index}.session`, name ?? '', setValueOptions);
  });
};

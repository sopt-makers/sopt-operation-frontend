import type { FieldValues } from 'react-hook-form';

import type {
  AddAdminAboutRequestDto,
  AddAdminActivityScheduleRequestDto,
  AddAdminMemberRequestDto,
} from '@/__generated__/org-types/data-contracts';
import { uploadToS3 } from '@/components/org/OrgAdmin/HomeSection/api';
import { ACTIVITY_GENERATION } from '@/utils/generation';

import { soptFetcher } from '../api';
import { EXEC_ROLE_LIST, toMemberRole } from './memberRole';

type ImageField = { fileName?: string; file?: File } | undefined;

export const postAboutTab = async (body: AddAdminAboutRequestDto) => {
  const { data, error } = await soptFetcher.POST('/admin/about', { body });

  if (error || !data) {
    throw new Error('소개 탭 배포 요청에 실패했습니다.');
  }

  return data;
};

export const postAboutTabConfirm = async () => {
  const { data, error } = await soptFetcher.POST('/admin/about/confirm', {
    body: {
      generation: Number(ACTIVITY_GENERATION),
    },
  });

  if (error || !data) {
    throw new Error('소개 탭 배포 확정에 실패했습니다.');
  }

  return data;
};

type CoreValueInput = {
  value: string;
  description: string;
  detailDescription: string;
  imageFileName?: string;
  file?: File;
};

type MemberInput = AddAdminMemberRequestDto & {
  file?: File;
};

export const buildCoreValuesFromForm = (
  values: FieldValues,
): CoreValueInput[] =>
  [1, 2, 3].map((index) => {
    const coreValue = values[`coreValue${index}`] ?? {};
    const imageFileName = coreValue.imageFileName as ImageField;

    return {
      value: coreValue.value ?? '',
      description: coreValue.description ?? '',
      detailDescription: coreValue.detailDescription ?? '',
      imageFileName: imageFileName?.fileName,
      file: imageFileName?.file,
    };
  });

export const buildMembersFromForm = (values: FieldValues): MemberInput[] =>
  EXEC_ROLE_LIST.map((role) => {
    const member = values.member?.[role];
    const apiRole = toMemberRole(role);
    const profileImageFileName = member?.profileImageFileName as ImageField;

    return {
      role: apiRole,
      name: member?.name ?? '',
      affiliation: member?.affiliation ?? '',
      introduction: member?.introduction ?? '',
      sns: {
        email: member?.sns?.email ?? '',
        linkedin: member?.sns?.linkedin ?? '',
        github: member?.sns?.github ?? '',
        behance: member?.sns?.behance ?? '',
      },
      profileImageFileName: profileImageFileName?.fileName,
      file: profileImageFileName?.file,
    };
    // 이름이 없으면 실존 인물이 아니라 빈 슬롯이다(이미지만 우연히 붙어도 마찬가지).
    // 백엔드도 name을 필수로 요구하므로, 비어있으면 통째로 빼고 보낸다.
  }).filter((member) => member.name);

const SCHEDULE_ROW_COUNT = 16;

export const buildActivityScheduleFromForm = (
  values: FieldValues,
): AddAdminActivityScheduleRequestDto[] =>
  Array.from(
    { length: SCHEDULE_ROW_COUNT },
    (_, index) => values.activitySchedule?.[index],
  )
    .filter((row) => row?.date && row?.session)
    .map((row) => ({
      name: row.session,
      startDate: row.date,
    }));

export type DeployAboutInput = {
  headerImageFileName?: string;
  headerImageFile?: File;
  coreValues: CoreValueInput[];
  members: MemberInput[];
  activitySchedule?: AddAdminActivityScheduleRequestDto[];
};

export const deployAboutTab = async ({
  headerImageFileName,
  headerImageFile,
  coreValues,
  members,
  activitySchedule,
}: DeployAboutInput) => {
  const deployResponse = await postAboutTab({
    generation: Number(ACTIVITY_GENERATION),
    headerImageFileName,
    coreValue: coreValues.map(
      ({ value, description, detailDescription, imageFileName }) => ({
        value,
        description,
        detailDescription,
        imageFileName,
      }),
    ),
    member: members.map(({ file, ...member }) => member),
    activitySchedule,
  });

  if (headerImageFile && deployResponse.headerImage) {
    const uploadResponse = await uploadToS3(
      deployResponse.headerImage,
      headerImageFile,
    );

    if (!uploadResponse.ok) {
      throw new Error('소개탭 헤더 이미지 업로드에 실패했습니다.');
    }
  }

  await Promise.all(
    coreValues.map(async (coreValue) => {
      if (!coreValue.file) return;

      const presignedUrl = deployResponse.coreValues?.find(
        (item) => item.value === coreValue.value,
      )?.image;

      if (!presignedUrl) return;

      const uploadResponse = await uploadToS3(presignedUrl, coreValue.file);

      if (!uploadResponse.ok) {
        throw new Error('핵심 가치 이미지 업로드에 실패했습니다.');
      }
    }),
  );

  await Promise.all(
    members.map(async (member) => {
      if (!member.file) return;

      const presignedUrl = deployResponse.members?.find(
        (item) => item.role === member.role,
      )?.profileImage;

      if (!presignedUrl) return;

      const uploadResponse = await uploadToS3(presignedUrl, member.file);

      if (!uploadResponse.ok) {
        throw new Error('임원진 프로필 이미지 업로드에 실패했습니다.');
      }
    }),
  );

  return postAboutTabConfirm();
};

export const deployAboutTabFromForm = async (values: FieldValues) => {
  const headerImageFileName = values.headerImageFileName as ImageField;

  return deployAboutTab({
    headerImageFileName: headerImageFileName?.fileName,
    headerImageFile: headerImageFileName?.file,
    coreValues: buildCoreValuesFromForm(values),
    members: buildMembersFromForm(values),
    activitySchedule: buildActivityScheduleFromForm(values),
  });
};

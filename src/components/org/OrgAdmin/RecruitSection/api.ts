import type { FieldValues } from 'react-hook-form';

import type { AddAdminRecruitRequestDto } from '@/__generated__/org-types/data-contracts';
import {
  extractFileNameFromUrl,
  uploadToS3,
} from '@/components/org/OrgAdmin/HomeSection/api';
import { ACTIVITY_GENERATION } from '@/utils/generation';
import { FAQ_MAX_QUESTION_COUNT, PART_LIST } from '@/utils/org';

import { soptFetcher } from '../api';

const CURRICULUM_WEEK_COUNT = 8;

type RecruitHeaderImageField = {
  fileName?: string;
  file?: File;
};

export const postRecruitTab = async (body: AddAdminRecruitRequestDto) => {
  const { data, error } = await soptFetcher.POST('/admin/recruit', { body });

  if (error || !data) {
    throw new Error('모집안내 탭 배포 요청에 실패했습니다.');
  }

  return data;
};

export const postRecruitTabConfirm = async () => {
  const { data, error } = await soptFetcher.POST('/admin/recruit/confirm', {
    body: {
      generation: Number(ACTIVITY_GENERATION),
    },
  });

  if (error || !data) {
    throw new Error('모집안내 탭 배포 확정에 실패했습니다.');
  }

  return data;
};

export type DeployRecruitInput = {
  recruitHeaderImageFileName: string;
  recruitHeaderImageFile?: File;
  partIntroduction: AddAdminRecruitRequestDto['partIntroduction'];
  partCurriculum: AddAdminRecruitRequestDto['partCurriculum'];
  recruitPartCurriculum: AddAdminRecruitRequestDto['recruitPartCurriculum'];
  recruitQuestion: AddAdminRecruitRequestDto['recruitQuestion'];
};

const buildRecruitQuestions = (values: FieldValues) =>
  PART_LIST.map((part) => ({
    part,
    questions: Array.from({ length: FAQ_MAX_QUESTION_COUNT }, (_, index) => ({
      question: values.recruitQuestion?.[part]?.[`question${index}`] ?? '',
      answer: values.recruitQuestion?.[part]?.[`answer${index}`] ?? '',
    })).filter((qa) => qa.question && qa.answer),
  }));

export const buildDeployRecruitInputFromForm = (
  values: FieldValues,
): Omit<
  DeployRecruitInput,
  'recruitHeaderImageFileName' | 'recruitHeaderImageFile'
> => ({
  partIntroduction: PART_LIST.map((part) => ({
    part,
    description: values[`partIntroduction${part}`] ?? '',
  })),
  partCurriculum: PART_LIST.map((part) => ({
    part,
    curriculums: Array.from(
      { length: CURRICULUM_WEEK_COUNT },
      (_, index) => values.partCurriculum?.[part]?.[index] ?? '',
    ),
  })),
  recruitPartCurriculum: PART_LIST.map((part) => ({
    part,
    introduction: {
      content: values.recruitPartCurriculum?.[part]?.content ?? '',
      preference: values.recruitPartCurriculum?.[part]?.preference ?? '',
    },
  })),
  recruitQuestion: buildRecruitQuestions(values),
});

export const resolveRecruitHeaderImageFileName = (
  recruitHeaderImage: RecruitHeaderImageField | undefined,
  existingRecruitHeaderImageUrl?: string,
) =>
  recruitHeaderImage?.fileName ??
  (existingRecruitHeaderImageUrl
    ? extractFileNameFromUrl(existingRecruitHeaderImageUrl)
    : '');

export const deployRecruitTab = async ({
  recruitHeaderImageFileName,
  recruitHeaderImageFile,
  partIntroduction,
  partCurriculum,
  recruitPartCurriculum,
  recruitQuestion,
}: DeployRecruitInput) => {
  const deployResponse = await postRecruitTab({
    generation: Number(ACTIVITY_GENERATION),
    recruitHeaderImageFileName,
    partIntroduction,
    partCurriculum,
    recruitPartCurriculum,
    recruitQuestion,
  });

  if (recruitHeaderImageFile && deployResponse.recruitHeaderImage) {
    const uploadResponse = await uploadToS3(
      deployResponse.recruitHeaderImage,
      recruitHeaderImageFile,
    );

    if (!uploadResponse.ok) {
      throw new Error('모집안내 헤더 이미지 업로드에 실패했습니다.');
    }
  }

  return postRecruitTabConfirm();
};

export const deployRecruitTabFromForm = async (
  values: FieldValues,
  existingRecruitHeaderImageUrl?: string,
) => {
  const recruitHeaderImage = values.recruitHeaderImage as
    | RecruitHeaderImageField
    | undefined;

  return deployRecruitTab({
    recruitHeaderImageFileName: resolveRecruitHeaderImageFileName(
      recruitHeaderImage,
      existingRecruitHeaderImageUrl,
    ),
    recruitHeaderImageFile: recruitHeaderImage?.file,
    ...buildDeployRecruitInputFromForm(values),
  });
};

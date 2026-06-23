import type { FieldValues } from 'react-hook-form';

import type {
  AddAdminBrandingColorRequestDto,
  AddAdminCommonRequestDto,
  AddAdminRecruitScheduleRequestDto,
} from '@/__generated__/org-types/data-contracts';

import { soptFetcher } from '../api';
import {
  buildBrandingColorFromForm,
  buildRecruitScheduleFromForm,
} from './formMapper';

export const postCommonTab = async (body: AddAdminCommonRequestDto) => {
  const { data, error } = await soptFetcher.POST('/admin/common', { body });

  if (error || !data) {
    throw new Error('공통 탭 배포 요청에 실패했습니다.');
  }

  return data;
};

export const postCommonTabConfirm = async (generation: number) => {
  const { data, error } = await soptFetcher.POST('/admin/common/confirm', {
    body: { generation },
  });

  if (error || !data) {
    throw new Error('공통 탭 배포 확정에 실패했습니다.');
  }

  return data;
};

export type DeployCommonInput = {
  generation: number;
  name: string;
  recruitSchedule: AddAdminRecruitScheduleRequestDto[];
  brandingColor: AddAdminBrandingColorRequestDto;
};

export const deployCommonTab = async ({
  generation,
  name,
  recruitSchedule,
  brandingColor,
}: DeployCommonInput) => {
  await postCommonTab({
    generation,
    name,
    recruitSchedule,
    brandingColor,
  });

  return postCommonTabConfirm(generation);
};

export const deployCommonTabFromForm = async (values: FieldValues) =>
  deployCommonTab({
    generation: Number(values.generation),
    name: values.name,
    recruitSchedule: buildRecruitScheduleFromForm(values),
    brandingColor: buildBrandingColorFromForm(values),
  });

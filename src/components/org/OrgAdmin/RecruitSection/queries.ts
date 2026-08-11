import { useToast } from '@sopt-makers/ui';
import type { FieldValues } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { DEPLOY_TOAST_OPTION } from '@/components/org/OrgAdmin/HomeSection/_constants/constants';
import { deployRecruitTabFromForm } from '@/components/org/OrgAdmin/RecruitSection/api';

type DeployRecruitTabFromFormInput = {
  values: FieldValues;
  existingRecruitHeaderImageUrl?: string;
};

export const useDeployRecruitMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: ({
      values,
      existingRecruitHeaderImageUrl,
    }: DeployRecruitTabFromFormInput) =>
      deployRecruitTabFromForm(values, existingRecruitHeaderImageUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      open(DEPLOY_TOAST_OPTION.success);
    },
    onError: () => {
      open(DEPLOY_TOAST_OPTION.error);
    },
  });
};

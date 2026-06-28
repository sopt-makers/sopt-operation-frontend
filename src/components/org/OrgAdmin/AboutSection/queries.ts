import { useToast } from '@sopt-makers/ui';
import type { FieldValues } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { DEPLOY_TOAST_OPTION } from '@/components/org/OrgAdmin/HomeSection/_constants/constants';

import { deployAboutTabFromForm } from './api';

type DeployAboutTabFromFormInput = {
  values: FieldValues;
};

export const useDeployAboutMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: ({ values }: DeployAboutTabFromFormInput) =>
      deployAboutTabFromForm(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      open(DEPLOY_TOAST_OPTION.success);
    },
    onError: () => {
      open(DEPLOY_TOAST_OPTION.error);
    },
  });
};

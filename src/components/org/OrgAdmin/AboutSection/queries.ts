import { useToast } from '@sopt-makers/ui';
import type { FieldValues } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';

import { DEPLOY_TOAST_OPTION } from '@/components/org/OrgAdmin/HomeSection/_constants/constants';

import { deployAboutTabFromForm, type ExistingAboutData } from './api';

type DeployAboutTabFromFormInput = {
  values: FieldValues;
  existingData?: ExistingAboutData;
};

export const useDeployAboutMutation = () => {
  const queryClient = useQueryClient();
  const { open } = useToast();

  return useMutation({
    mutationFn: ({ values, existingData }: DeployAboutTabFromFormInput) =>
      deployAboutTabFromForm(values, existingData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin'] });
      open(DEPLOY_TOAST_OPTION.success);
    },
    onError: () => {
      open(DEPLOY_TOAST_OPTION.error);
    },
  });
};

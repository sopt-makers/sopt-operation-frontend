import { useMutation, useQueryClient } from 'react-query';

import { postNewSession } from '@/services/api/lecture';
import { getAuthHeader, getToken } from '@/utils/auth';
import { partTranslator } from '@/utils/session';

type MutationInput = {
  newData: SessionBase;
  authHeader: AuthHeader;
};

export const useCreateSession = (part: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, ProjectError, MutationInput, SessionBase>(
    ({ newData, authHeader }) => postNewSession(newData, authHeader),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'sessionList',
          32,
          partTranslator[part],
          getAuthHeader(),
        ]);
      },
    },
  );

  const createSession = (submitContents: SessionBase) => {
    const authHeader = getAuthHeader();

    mutation.mutate({ newData: submitContents, authHeader });
  };

  return { createSession };
};

import { useMutation, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';

import { currentGenerationState } from '@/recoil/atom';
import { postNewSession } from '@/services/api/lecture';
import { partTranslator } from '@/utils/session';

interface MutationInput {
  newData: SessionBase;
}

/** 세션 생성 시 작동하는 커스텀 훅
 * @param  part 선택한 파트
 * @return createSession 함수를 return 하여 외부에서 사용할 수 있도록 함.
 */
export const useCreateSession = (part: string) => {
  const queryClient = useQueryClient();

  const currentGeneration = useRecoilValue(currentGenerationState);

  const mutation = useMutation<void, ProjectError, MutationInput, SessionBase>(
    ({ newData }) => postNewSession(newData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([
          'sessionList',
          parseInt(currentGeneration),
          partTranslator[part],
        ]);
      },
    },
  );

  /** useCreateSession 내의 useMutation 을 실행시키는 함수
   * @param submitContents 세션 생성에 필요한 정보를 담은 객체
   */
  const createSession = (submitContents: SessionBase) => {
    mutation.mutate({ newData: submitContents });
  };

  return { createSession };
};

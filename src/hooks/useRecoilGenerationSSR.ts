import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { currentGenerationState } from '@/recoil/atom';
import { ACTIVITY_GENRATION } from '@/utils/generation';

export const useRecoilGenerationSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(currentGenerationState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? ACTIVITY_GENRATION : value, setValue] as const;
};

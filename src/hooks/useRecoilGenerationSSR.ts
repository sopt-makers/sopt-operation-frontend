import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { currentGenerationState } from '@/recoil/atom';
import { ACTIVITY_GENERATION } from '@/utils/generation';

export const useRecoilGenerationSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(currentGenerationState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? ACTIVITY_GENERATION : value, setValue] as const;
};

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { currentGenerationState } from '@/recoil/atom';
import { activityGeneration } from '@/utils/activityGeneration';

export const useRecoilGenerationSSR = () => {
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(currentGenerationState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? activityGeneration : value, setValue] as const;
};

import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { currentGenerationState } from '@/recoil/atom';

export const useRecoilGenerationSSR = () => {
  const defaultValue = '33';
  const [isInitial, setIsInitial] = useState(true);
  const [value, setValue] = useRecoilState(currentGenerationState);

  useEffect(() => {
    setIsInitial(false);
  }, []);

  return [isInitial ? defaultValue : value, setValue] as const;
};

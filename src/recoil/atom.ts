import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

import { ACTIVITY_GENERATION } from '@/utils/generation';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'generationStorage',
  storage: sessionStorage,
});

export const currentGenerationState = atom<string>({
  key: 'currentGenerationState',
  default: ACTIVITY_GENERATION,
  effects_UNSTABLE: [persistAtom],
});

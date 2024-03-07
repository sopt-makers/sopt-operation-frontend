import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'generationStorage',
  storage: sessionStorage,
});

export const currentGenerationState = atom<string>({
  key: 'currentGenerationState',
  default: '34',
  effects_UNSTABLE: [persistAtom],
});

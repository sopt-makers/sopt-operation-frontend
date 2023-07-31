import { atom } from 'recoil';

export const currentGenerationState = atom<string>({
  key: 'currentGenerationState',
  default: '32',
});

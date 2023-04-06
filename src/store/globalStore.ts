import { atom } from 'recoil';

export const user = atom<User>({
  key: 'user',
  default: {
    id: 0,
    name: '',
  },
});

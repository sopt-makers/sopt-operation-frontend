import { atom } from 'recoil';

export const user = atom<User>({
  key: 'userData',
  default: {
    id: 0,
    name: '',
  },
});

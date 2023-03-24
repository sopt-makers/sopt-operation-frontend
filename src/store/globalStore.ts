import { atom } from 'recoil';

export const user = atom<User>({
  key: 'userData',
  default: {
    name: 'sohee',
    age: 26,
  },
});

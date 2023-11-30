import { atom, DefaultValue, selector } from 'recoil';

export const user = atom<User>({
  key: 'userData',
  default: {
    id: 0,
    adminStatus: 'NOT_CERTIFIED',
    name: '',
  },
});

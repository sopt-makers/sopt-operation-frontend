import { atom, DefaultValue, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const sessionStorage =
  typeof window !== 'undefined' ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: 'adminStatusStorage',
  storage: sessionStorage,
});

export const user = atom<User>({
  key: 'userData',
  default: {
    id: 0,
    adminStatus: 'NOT_CERTIFIED',
    name: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const adminStatusState = selector({
  key: 'adminStatusState',
  get: ({ get }) => {
    const userData = get(user);
    return userData.adminStatus;
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    set(user, (prevUserData) => ({
      ...prevUserData,
      adminStatus: newValue,
    }));
  },
});

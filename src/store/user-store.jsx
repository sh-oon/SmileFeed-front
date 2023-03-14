import { atom } from 'recoil';

export const currentUserState = atom({
  key: 'userState',
  default: {
    email: '',
    name: '',
    phone: '',
    birth: '',
    gender: '',
  },
});
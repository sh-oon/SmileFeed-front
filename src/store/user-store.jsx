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

export const currentUserSettingState = atom({
  key: 'userSettingState',
  default: {
    alert: false,
    backgroundColor: "#ffffff",
    font: "Noto Sans KR",
    fontSize: 14,
    passwordLock: false,
    syncronize: false,
    theme: "light",
  }
});
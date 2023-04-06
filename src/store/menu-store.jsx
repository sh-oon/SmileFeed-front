import { atom } from 'recoil';

export const currentPageState = atom({
  key: 'menuState',
  default: 'Home',
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
import { atom } from 'recoil';

export const currentPageState = atom({
  key: 'menuState',
  default: 'Home',
});
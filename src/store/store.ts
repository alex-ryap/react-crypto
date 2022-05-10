import { configureStore } from '@reduxjs/toolkit';
import coinsSlice from './coinsSlice';

export const store = configureStore({
  reducer: {
    coins: coinsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;

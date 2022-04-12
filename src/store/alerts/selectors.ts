import { RootState } from '..';

export const selectAlert = (state: RootState) => state.alert.alert;

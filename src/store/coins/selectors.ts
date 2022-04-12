import { RootState } from '..';

export const selectCoins = (state: RootState) => state.coins.coins;

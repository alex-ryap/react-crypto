import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normalizeNumber } from '../utils/commons';
import { AlertTypes } from '../utils/enums';
import { ICoin, IAlert } from '../utils/interfaces';
import { fetchCoin } from './fetchCoinPrice';
import { RootState } from './store';

interface CoinsSlice {
  coins: ICoin[];
  alert: IAlert;
  status: string | null;
}

const initialState: CoinsSlice = {
  coins: [],
  alert: {
    text: '',
    type: AlertTypes.Success,
    show: false,
  },
  status: null,
};

export const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ICoin>) => {
      const { coins, alert } = state;

      const existedCoinIndex = coins.findIndex(
        (coin) => coin.name === action.payload.name
      );
      if (existedCoinIndex === -1) {
        coins.push(action.payload);
        alert.text = `Add coin "${action.payload.name}"`;
        state.alert.type = AlertTypes.Success;
        alert.show = true;
      } else {
        const currentCoin = coins[existedCoinIndex];
        if (currentCoin.price !== action.payload.price) {
          currentCoin.diff = normalizeNumber(
            currentCoin.price - action.payload.price
          );
          currentCoin.price = action.payload.price;
        }
      }
    },
    remove: (state, action: PayloadAction<string>) => {
      state.coins = state.coins.filter((coin) => coin.id !== action.payload);
      state.alert.text = `Remove coin`;
      state.alert.type = AlertTypes.Success;
      state.alert.show = true;
    },
    hide: (state) => {
      state.alert.show = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCoin.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(
      fetchCoin.fulfilled,
      (state, action: PayloadAction<ICoin>) => {
        state.status = 'resolved';
      }
    );
    builder.addCase(fetchCoin.rejected, (state, { payload }) => {
      state.status = 'error';
      if (payload) {
        state.alert.text = payload;
        state.alert.type = AlertTypes.Error;
        state.alert.show = true;
      }
    });
  },
});

export const { add, remove, hide } = coinsSlice.actions;
export const SelectCoins = (state: RootState) => state.coins.coins;
export const SelectAlert = (state: RootState) => state.coins.alert;

export default coinsSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuid4 } from 'uuid';
import { normalizeNumber } from '../utils/commons';
import { API_KEY, BASE_URL, CURRENCY } from '../utils/constants';
import { ICoin } from '../utils/interfaces';
import { add } from './coinsSlice';

export const fetchCoin = createAsyncThunk<
  ICoin,
  string,
  {
    rejectValue: string;
  }
>('coins/fetchCoin', async (name, thunkAPI) => {
  try {
    const response = await fetch(
      `${BASE_URL}?fsym=${name}&tsyms=${CURRENCY}&api_key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error('Server error');
    }
    const data = await response.json();
    if (data.Response === 'Error') {
      throw new Error(`Not found coin "${name}"`);
    }
    const coin: ICoin = {
      id: uuid4(),
      name,
      price: normalizeNumber(data[CURRENCY]),
      diff: 0,
    };

    thunkAPI.dispatch(add(coin));

    return coin;
  } catch (err) {
    return thunkAPI.rejectWithValue((err as Error).message);
  }
});

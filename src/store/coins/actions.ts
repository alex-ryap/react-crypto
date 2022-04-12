import axios from 'axios';
import { Dispatch } from 'redux';
import { normalizeNumber } from '../../utils/commons';
import { API_KEY, BASE_URL, CURRENCY } from '../../utils/constants';
import { CoinActions } from '../../utils/enums';
import { ICoin } from '../../utils/interfaces';
import { RootAction } from './reducer';

export const addCoin =
  (name: string) => async (dispatch: Dispatch<RootAction>) => {
    try {
      const url = `${BASE_URL}?fsym=${name}&tsyms=${CURRENCY}&api_key=${API_KEY}`;
      const response = await axios.get(url);

      if (response.data?.Response === 'Error')
        throw new Error(`Sorry! Coin "${name}" was not found`);

      const currentPrice = normalizeNumber(response.data[CURRENCY]);

      const coin = {
        name,
        price: currentPrice,
        diff: 0,
      };

      dispatch({ type: CoinActions.ADD_COIN, payload: coin });
    } catch (err) {
      console.log(err);
    }
  };

export const RemoveCoin = (coin: ICoin) => ({
  type: CoinActions.REMOVE_COIN,
  payload: coin,
});

export const updateCoinPrice =
  (coin: ICoin) => async (dispatch: Dispatch<RootAction>) => {
    try {
      const url = `${BASE_URL}?fsym=${coin.name}&tsyms=${CURRENCY}&api_key=${API_KEY}`;
      const response = await axios.get(url);

      if (response.data?.Response === 'Error')
        throw new Error(`Sorry! Coin "${coin.name}" was not found`);

      const currentPrice = normalizeNumber(response.data[CURRENCY]);

      if (coin.price !== currentPrice) {
        const updatedCoin = {
          name: coin.name,
          price: currentPrice,
          diff: 0,
        };
        if (coin.price)
          updatedCoin.diff = normalizeNumber(currentPrice - coin.price);

        dispatch({ type: CoinActions.UPDATE_COIN, payload: updatedCoin });
      }
    } catch (err) {
      console.log(err);
    }
  };

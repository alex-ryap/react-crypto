import { Dispatch } from 'redux';
import { getPrice, normalizeNumber } from '../../utils/commons';
import { CoinActions } from '../../utils/enums';
import { ICoin } from '../../utils/interfaces';
import { RootAction } from './reducer';

export const addCoin =
  (name: string) => async (dispatch: Dispatch<RootAction>) => {
    const result = await getPrice(name);

    if (typeof result === 'string') {
      dispatch({ type: CoinActions.GET_COINS_FAILURE, payload: result });
    } else if (typeof result === 'number') {
      const coin = {
        name,
        price: result,
        diff: 0,
      };

      dispatch({ type: CoinActions.ADD_COIN, payload: coin });
    }
  };

export const RemoveCoin = (coin: ICoin) => ({
  type: CoinActions.REMOVE_COIN,
  payload: coin,
});

export const updateCoinPrice =
  (coin: ICoin) => async (dispatch: Dispatch<RootAction>) => {
    const result = await getPrice(coin.name);

    console.log(`check updates ${coin.name}`);

    if (typeof result === 'string') {
      dispatch({ type: CoinActions.GET_COINS_FAILURE, payload: result });
    } else if (typeof result === 'number') {
      if (coin.price !== result) {
        const updatedCoin = {
          name: coin.name,
          price: result,
          diff: 0,
        };
        if (coin.price) updatedCoin.diff = normalizeNumber(result - coin.price);

        dispatch({ type: CoinActions.UPDATE_COIN, payload: updatedCoin });
      }
    }
  };

import { CURRENCY } from '../../utils/constants';
import { AlertType, CoinActions } from '../../utils/enums';
import {
  AddCoin,
  GetCoinsFailureAction,
  GetCoinsLoadingAction,
  GetCoinsSuccessAction,
  IAlert,
  ICoin,
  RemoveCoin,
  UpdateCoinAction,
} from '../../utils/interfaces';

interface RootState {
  currency: string;
  coins: Array<ICoin>;
  alert: IAlert;
  loading: boolean;
  error: null | string;
}

const initialState: RootState = {
  currency: CURRENCY,
  coins: [],
  alert: {
    text: '',
    type: AlertType.info,
    show: false,
  },
  loading: false,
  error: null,
};

export type RootAction =
  | GetCoinsLoadingAction
  | GetCoinsSuccessAction
  | GetCoinsFailureAction
  | AddCoin
  | RemoveCoin
  | UpdateCoinAction;

export const coinsReducer = (
  state = initialState,
  action: RootAction
): RootState => {
  switch (action.type) {
    case CoinActions.ADD_COIN: {
      return {
        ...state,
        coins: [...state.coins, action.payload],
      };
    }
    case CoinActions.REMOVE_COIN: {
      return {
        ...state,
        coins: [
          ...state.coins.filter((coin) => coin.name !== action.payload.name),
        ],
      };
    }
    case CoinActions.GET_COINS_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case CoinActions.GET_COINS_SUCCESS: {
      return {
        ...state,
        coins: [...action.payload],
        loading: false,
      };
    }
    case CoinActions.GET_COINS_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }
    case CoinActions.UPDATE_COIN: {
      return {
        ...state,
        coins: [
          ...state.coins.map((coin) => {
            if (coin.name === action.payload.name) {
              coin.price = action.payload.price;
              coin.diff = action.payload.diff;
              console.log(`update coin ${coin.name}`);
            }
            return coin;
          }),
        ],
      };
    }
    default:
      return state;
  }
};

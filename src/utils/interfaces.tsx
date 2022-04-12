import { AlertActions, AlertType, CoinActions } from './enums';

export interface ICoin {
  name: string;
  price: number;
  diff: number;
}

export interface IAlert {
  text: string;
  type: AlertType;
  show: boolean;
}

export interface GetCoinsLoadingAction {
  type: CoinActions.GET_COINS_LOADING;
}

export interface GetCoinsSuccessAction {
  type: CoinActions.GET_COINS_SUCCESS;
  payload: any[];
}

export interface UpdateCoinAction {
  type: CoinActions.UPDATE_COIN;
  payload: ICoin;
}

export interface GetCoinsFailureAction {
  type: CoinActions.GET_COINS_FAILURE;
  payload: string;
}

export interface AddCoin {
  type: CoinActions.ADD_COIN;
  payload: ICoin;
}

export interface RemoveCoin {
  type: CoinActions.REMOVE_COIN;
  payload: ICoin;
}

export interface AddAlertAction {
  type: AlertActions.ADD_ALERT;
  payload: IAlert;
}

export interface RemoveAlertAction {
  type: AlertActions.REMOVE_ALERT;
}

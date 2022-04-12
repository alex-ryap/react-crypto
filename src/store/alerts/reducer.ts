import { AlertActions, AlertType } from '../../utils/enums';
import {
  AddAlertAction,
  IAlert,
  RemoveAlertAction,
} from '../../utils/interfaces';

export interface AlertState {
  alert: IAlert;
}

const initialState: AlertState = {
  alert: { text: '', type: AlertType.info, show: false },
};

export type AlertAction = AddAlertAction | RemoveAlertAction;

export const alertReducer = (
  state = initialState,
  action: AlertAction
): AlertState => {
  switch (action.type) {
    case AlertActions.ADD_ALERT: {
      return {
        ...state,
        alert: {
          text: action.payload.text,
          type: action.payload.type,
          show: true,
        },
      };
    }
    case AlertActions.REMOVE_ALERT: {
      return {
        ...state,
        alert: {
          text: '',
          type: AlertType.info,
          show: false,
        },
      };
    }
    default:
      return state;
  }
};

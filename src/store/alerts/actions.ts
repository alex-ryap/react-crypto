import { AlertActions } from '../../utils/enums';
import { IAlert } from '../../utils/interfaces';

export const addAlert = (alert: IAlert) => ({
  type: AlertActions.ADD_ALERT,
  payload: alert,
});

export const removeAlert = () => ({
  type: AlertActions.REMOVE_ALERT,
});

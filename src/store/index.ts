import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { alertReducer } from './alerts/reducer';
import { coinsReducer } from './coins/reducer';

const rootReducer = combineReducers({
  coins: coinsReducer,
  alert: alertReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { userPersistConfig } from './webStorageConfigs';
import { persistReducer } from 'redux-persist';
import { IUserState, userReducer } from './userReducer';
import { IDialogState } from '../dialogs/selectors';
import { dialog } from '../dialogs/reducer';
import { notificationReducer } from './notificationReducer';
import { requestUpdateReducer } from './requestUpdateReducer';

export interface IStoreState {
  router: RouterState;
  user: IUserState;
  dialog: IDialogState;
}

const createRootReducer = (history: History, requestsReducer: Reducer) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    requests: (store: IStoreState, action: AnyAction) =>
      requestUpdateReducer(requestsReducer(store, action), action),
    dialog,
    notification: notificationReducer,
  });

export { createRootReducer };

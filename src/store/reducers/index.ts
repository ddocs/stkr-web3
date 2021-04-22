import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { dialog } from '../dialogs/reducer';
import { IDialogState } from '../dialogs/selectors';
import { notificationReducer } from './notificationReducer';
import { requestUpdateReducer } from './requestUpdateReducer';
import { IUserState, userReducer } from './userReducer';
import { userPersistConfig } from './webStorageConfigs';

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

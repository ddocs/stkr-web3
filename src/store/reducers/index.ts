import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { userPersistConfig } from './webStorageConfigs';
import { persistReducer } from 'redux-persist';
import { IUserState, userReducer } from './userReducer';
import { ModalState } from '../modals/selectors';
import { modals } from '../modals/reducer';
import { notificationReducer } from './notificationReducer';
import { requestUpdateReducer } from './requestUpdateReducer';

export interface IStoreState extends ModalState {
  router: RouterState;
  user: IUserState;
}

const createRootReducer = (history: History, requestsReducer: Reducer) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
    requests: (store: IStoreState, action: AnyAction) =>
      requestUpdateReducer(requestsReducer(store, action), action),
    modals,
    notification: notificationReducer,
  });

export { createRootReducer };

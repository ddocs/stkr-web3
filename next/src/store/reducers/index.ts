import { History } from 'history';
import { combineReducers } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { userPersistConfig } from './webStorageConfigs';
import { persistReducer } from 'redux-persist';
import { IUserState, userReducer } from './userReducer';

export interface IStoreState {
  router: RouterState;
  user: IUserState;
}

const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: persistReducer(userPersistConfig, userReducer),
  });

export { createRootReducer };

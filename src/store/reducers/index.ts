import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import { AnyAction, combineReducers, Reducer } from 'redux';
import { persistReducer } from 'redux-persist';
import { dialog } from '../../modules/dialogs/reducer';
import { IDialogState } from '../../modules/dialogs/selectors';
import { INotificationState, notificationReducer } from './notificationReducer';
import { requestUpdateReducer } from './requestUpdateReducer';
import { IUserState, userReducer } from './userReducer';
import { userPersistConfig } from './webStorageConfigs';
import { SidecarStatus } from '../../modules/api/gateway';
import {
  IPolkadotState,
  polkadotSlice,
} from '../../modules/pokadot/reducers/polkadotSlice';

interface ISidecar {
  status: SidecarStatus;
}

export interface ISidecars {
  items: ISidecar[];
}

const createRootReducer = (history: History, requestsReducer: Reducer) =>
  combineReducers({
    router: connectRouter(history) as Reducer<RouterState>,
    user: persistReducer(userPersistConfig, userReducer) as Reducer<IUserState>,
    requests: (store: any, action: AnyAction) =>
      requestUpdateReducer(requestsReducer(store, action), action),
    dialog: dialog as Reducer<IDialogState>,
    polkadot: polkadotSlice.reducer as Reducer<IPolkadotState>,
    notification: notificationReducer as Reducer<INotificationState>,
  });

export type IStoreState = ReturnType<ReturnType<typeof createRootReducer>>;

export { createRootReducer };

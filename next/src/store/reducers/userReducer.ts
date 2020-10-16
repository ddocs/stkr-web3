import { UserActionTypes } from '../actions/UserActions';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { createReducer } from '../../common/utils/createReducer';
import { createAPIReducer } from '../../common/utils/createAPIReducer';

export function isConnected(state: IUserState) {
  return !!state.isConnected;
}

export interface IConnectResponse {}

export interface IUserState {
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
  isConnected?: boolean;
}

const initialState: IUserState = {
  connectStatus: requestInactive(),
  disconnectStatus: requestInactive(),
  isConnected: false,
};

export const userReducer = createReducer(initialState, {
  ...createAPIReducer<IUserState, IConnectResponse>(
    UserActionTypes.CONNECT,
    'connectStatus',
    {
      onSuccess: state => ({ ...state, isConnected: true }),
    },
  ),
  // TODO Positive expectation response
  ...createAPIReducer<IUserState, IConnectResponse>(
    UserActionTypes.DISCONNECT,
    'disconnectStatus',
    {
      onSuccess: state => ({ ...state, isConnected: false }),
    },
  ),
});

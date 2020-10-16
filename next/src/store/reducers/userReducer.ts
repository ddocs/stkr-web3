import { UserActionTypes } from '../actions/UserActions';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { createReducer } from '../../common/utils/createReducer';
import { createAPIReducer } from '../../common/utils/createAPIReducer';
import { success } from '@redux-requests/core';
import { SuccessResponseAction } from '../apiMappers/successResponseAction';
import { IAuthorizeProviderResponse } from '../apiMappers/authorizeProvider';

export function isConnected(state: IUserState) {
  return !!state.isConnected;
}

export interface IConnectResponse {}

export interface IUserState {
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
  isConnected?: boolean;
  providerAccessToken?: string;
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
  [success(UserActionTypes.DISCONNECT)]: state => {
    return { ...state, isConnected: false, providerAccessToken: undefined };
  },
  [success(UserActionTypes.AUTHORIZE_PROVIDER)]: (
    state,
    action: SuccessResponseAction<IAuthorizeProviderResponse>,
  ) => {
    return { ...state, providerAccessToken: action.response.data.token };
  },
});

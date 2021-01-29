import { success } from '@redux-requests/core';
import { Action } from 'redux-actions';
import { Locale } from '../../common/types';
import { createAPIReducer } from '../../common/utils/createAPIReducer';
import { createReducer } from '../../common/utils/createReducer';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { ISetLanguagePayload, UserActionTypes } from '../actions/UserActions';
import { IAuthorizeProviderResponse } from '../apiMappers/authorizeProvider';
import { SuccessResponseAction } from '../apiMappers/successResponseAction';

export function isConnected(state: IUserState) {
  return state.isConnected;
}

export interface IConnectResponse {}

export interface IUserState {
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
  isConnected: boolean;
  isConnectionAvailable: boolean;
  providerAccessToken?: string;
  locale: Locale;
}

const initialState: IUserState = {
  connectStatus: requestInactive(),
  disconnectStatus: requestInactive(),
  isConnected: false,
  isConnectionAvailable: false,
  locale: Locale.en,
};

export const userReducer = createReducer(initialState, {
  ...createAPIReducer<IUserState, IConnectResponse>(
    UserActionTypes.CONNECT,
    'connectStatus',
    {
      onSuccess: state => ({
        ...state,
        isConnected: true,
        isConnectionAvailable: true,
      }),
    },
  ),
  [success(UserActionTypes.DISCONNECT)]: state => {
    return {
      ...state,
      isConnected: false,
      isConnectionAvailable: false,
      providerAccessToken: undefined,
    };
  },
  [success(UserActionTypes.AUTHORIZE_PROVIDER)]: (
    state,
    action: SuccessResponseAction<IAuthorizeProviderResponse>,
  ) => {
    return { ...state, providerAccessToken: action.response.data.token };
  },
  [UserActionTypes.SET_LOCALE]: (
    state,
    action: Action<ISetLanguagePayload>,
  ) => {
    return { ...state, locale: action.payload.locale };
  },
});

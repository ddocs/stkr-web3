import { success } from '@redux-requests/core';
import { Action } from 'redux-actions';
import { createSelector } from 'reselect';
import { Locale } from '../../common/types';
import { createAPIReducer } from '../../common/utils/redux/createAPIReducer';
import { createReducer } from '../../common/utils/redux/createReducer';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { ISetLanguagePayload, UserActionTypes } from '../actions/UserActions';
import { IAuthorizeProviderResponse } from '../apiMappers/authorizeProvider';
import { SuccessResponseAction } from '../apiMappers/successResponseAction';

export const selectUserState = (state: any): IUserState => state.user;

export function isConnected(state: IUserState) {
  return state.isConnected;
}

export const selectUserChainId = createSelector(
  selectUserState,
  ({ chainId }) => chainId,
);

export interface IConnectResponse {}

export interface IUserState {
  connectStatus: RequestStatus;
  disconnectStatus: RequestStatus;
  isConnected: boolean;
  isConnectionAvailable: boolean;
  providerAccessToken?: string;
  locale: Locale;
  chainId: number | undefined;
}

const initialState: IUserState = {
  connectStatus: requestInactive(),
  disconnectStatus: requestInactive(),
  isConnected: false,
  isConnectionAvailable: false,
  locale: Locale.en,
  chainId: undefined,
};

export const userReducer = createReducer(initialState, {
  ...createAPIReducer<IUserState, IConnectResponse>(
    UserActionTypes.CONNECT,
    'connectStatus',
    {
      onSuccess: (state, action: any) => ({
        ...state,
        isConnected: true,
        isConnectionAvailable: true,
        chainId: action.response.data.chainId,
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

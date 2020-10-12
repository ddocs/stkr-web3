import { UserActionTypes } from '../actions/UserActions';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { createReducer } from '../../common/utils/createReducer';
import { createAPIReducer } from '../../common/utils/createAPIReducer';

export function isAuthenticated(state: IUserState) {
  return !!state.isAuthenticated;
}

export interface ISignInResponse {}

export interface IUserState {
  signInStatus: RequestStatus;
  isAuthenticated?: boolean;
}

const initialState: IUserState = {
  signInStatus: requestInactive(),
  isAuthenticated: true,
};

export const userReducer = createReducer(initialState, {
  ...createAPIReducer<IUserState, ISignInResponse>(
    UserActionTypes.SIGN_IN,
    'signInStatus',
    {
      onSuccess: (state, action) => ({ ...state, isAuthenticated: true }),
    },
  ),
});

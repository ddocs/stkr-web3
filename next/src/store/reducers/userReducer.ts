import { UserActionTypes } from '../actions/UserActions';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { createReducer } from '../../common/utils/createReducer';
import { createAPIReducer } from '../../common/utils/createAPIReducer';
import { IUserInfo } from '../apiMappers/userApi';

export function isAuthenticated(state: IUserState) {
  return true; // until its not working
  // return !!state.userInfo?.displayName;
}

export interface ISignInResponse {}

export interface IUserState {
  signInStatus: RequestStatus;

  userUpdateInfoStatus: RequestStatus;
  userInfo?: IUserInfo;
}

const initialState: IUserState = {
  signInStatus: requestInactive(),

  userUpdateInfoStatus: requestInactive(),
};

export const userReducer = createReducer(initialState, {
  ...createAPIReducer<IUserState, ISignInResponse>(
    UserActionTypes.SIGN_IN,
    'signInStatus',
  ),
  ...createAPIReducer<IUserState, IUserInfo>(
    UserActionTypes.UPDATE_USER_INFO,
    'userUpdateInfoStatus',
    {
      onSuccess: (state, action) => {
        return { ...state, userInfo: action.payload };
      },
    },
  ),
});

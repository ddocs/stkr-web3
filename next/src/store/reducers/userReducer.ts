import { UserActionTypes } from '../actions/UserActions';
import {
  requestInactive,
  RequestStatus,
} from '../../common/utils/requestStatus';
import { createReducer } from '../../common/utils/createReducer';
import { createAPIReducer } from '../../common/utils/createAPIReducer';

export interface ISignInResponse {}

export interface IUserState {
  loginStatus: RequestStatus;
}

const initialState: IUserState = {
  loginStatus: requestInactive(),
};

export const userReducer = createReducer(initialState, {
  ...createAPIReducer<IUserState, ISignInResponse>(
    UserActionTypes.SIGN_IN,
    'loginStatus',
  ),
});

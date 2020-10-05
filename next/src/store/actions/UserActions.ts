
export const UserActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  UPDATE_USER_INFO: 'UPDATE_USER_INFO',
};

export const UserActions = {
  signIn: () => ({
    type: UserActionTypes.SIGN_IN,
  }),
  updateUserInfo: () => ({
    type: UserActionTypes.UPDATE_USER_INFO,
  }),
};

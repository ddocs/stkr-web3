
export const UserActionTypes = {
  SIGN_IN: 'SIGN_IN',
};

export const UserActions = {
  signIn: () => ({
    type: UserActionTypes.SIGN_IN,
  }),
};

import fetchMicropoolsData from '../../mocks/pools.json';

export const UserActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',

  UPDATE_USER_INFO: 'UPDATE_USER_INFO',

  FETCH_MICROPOOLS: 'FETCH_MICROPOOLS',
};

export const UserActions = {
  signIn: () => ({
    type: UserActionTypes.SIGN_IN,
  }),
  updateUserInfo: () => ({
    type: UserActionTypes.UPDATE_USER_INFO,
  }),
  fetchMicropools: () => ({
    type: UserActionTypes.FETCH_MICROPOOLS,
    request: {
      promise: new Promise(resolve => {
        setTimeout(() => {
          resolve(fetchMicropoolsData);
        });
      }),
    },
  }),
};

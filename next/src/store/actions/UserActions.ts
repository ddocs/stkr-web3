import fetchMicropoolsData from '../../mocks/pools.json';
import { IUserInfo } from '../apiMappers/userApi';

export const UserActionTypes = {
  SIGN_IN: 'SIGN_IN',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',

  FETCH_USER_INFO: 'FETCH_USER_INFO',

  FETCH_MICROPOOLS: 'FETCH_MICROPOOLS',

  APPLY_FOR_PROVIDER: 'APPLY_FOR_PROVIDER',
};

export const UserActions = {
  signIn: () => ({
    type: UserActionTypes.SIGN_IN,
  }),
  fetchUserInfo: () => ({
    type: UserActionTypes.FETCH_USER_INFO,
    request: {
      promise: new Promise<IUserInfo>(resolve => {
        setTimeout(() => {
          resolve({ address: '0x603366e08380EceB2E334621A27eeD36F34A9D50' });
        }, 1000);
      }),
    },
  }),
  fetchMicropools: () => ({
    type: UserActionTypes.FETCH_MICROPOOLS,
    request: {
      promise: new Promise(resolve => {
        setTimeout(() => {
          resolve(fetchMicropoolsData);
        }, 1000);
      }),
    },
  }),
  applyForProvider: () => ({
    type: UserActionTypes.APPLY_FOR_PROVIDER,
    request: {
      promise: new Promise(resolve => {
        setTimeout(() => {
          resolve(null);
        }, 1000);
      }),
    },
  }),
};

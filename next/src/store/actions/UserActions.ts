import fetchMicropoolsData from '../../mocks/pools.json';
import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import { t } from '../../common/utils/intl';
import BigNumber from 'bignumber.js';

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
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();

        if (!stkrSdk) {
          throw t('user-actions.error.sdk-not-initialized');
        }

        const address = stkrSdk.getKeyProvider().currentAccount();

        await stkrSdk.getApiGateway().getEtheremBalance(address);

        return {
          address,
          walletType: Providers.metamask,
          ethereumBalance: new BigNumber(
            (
              await stkrSdk
                .getApiGateway()
                .getEtheremBalance(stkrSdk.getKeyProvider().currentAccount())
            ).available,
          ),
          ankrBalance: new BigNumber(
            (
              await stkrSdk
                .getApiGateway()
                .getAnkrBalance(stkrSdk.getKeyProvider().currentAccount())
            ).available,
          ),
        } as IUserInfo;
      })(),
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

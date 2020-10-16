import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import { t } from '../../common/utils/intl';
import BigNumber from 'bignumber.js';
import { MicroPoolReply } from '../../modules/api/gateway';
import { IPool } from '../apiMappers/poolsApi';
import { differenceInCalendarMonths } from 'date-fns';

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

        const ankrBalance = await stkrSdk
          .getApiGateway()
          .getAnkrBalance(stkrSdk.getKeyProvider().currentAccount());
        const ethereumBalance = await stkrSdk
          .getApiGateway()
          .getEtheremBalance(address);

        return {
          address,
          walletType: Providers.metamask,
          ethereumBalance: new BigNumber(ethereumBalance.available),
          ankrBalance: new BigNumber(ankrBalance.available),
        } as IUserInfo;
      })(),
    },
  }),
  fetchMicropools: () => ({
    type: UserActionTypes.FETCH_MICROPOOLS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();

        if (!stkrSdk) {
          throw t('user-actions.error.sdk-not-initialized');
        }

        return await stkrSdk.getApiGateway().getMicroPools();
      })(),
    },
    meta: {
      getData: (data: MicroPoolReply[]): IPool[] =>
        data.map(item => ({
          name: item.name,
          provider: item.provider,
          period: differenceInCalendarMonths(item.startTime, item.endTime),
          fee: new BigNumber(item.nodeFee),
          currentStake: new BigNumber(item.claimedBalance),
          totalStake: new BigNumber(item.totalStakedAmount),
          status: item.status,
        })),
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

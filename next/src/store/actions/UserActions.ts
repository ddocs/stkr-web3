import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import BigNumber from 'bignumber.js';
import { MicroPoolReply } from '../../modules/api/gateway';
import { IPool } from '../apiMappers/poolsApi';
import { differenceInCalendarMonths } from 'date-fns';

export const UserActionTypes = {
  CONNECT: 'CONNECT',
  CONNECT_SUCCESS: 'CONNECT_SUCCESS',

  DISCONNECT: 'DISCONNECT',
  DISCONNECT_SUCCESS: 'DISCONNECT_SUCCESS',

  FETCH_ACCOUNT_DATA: 'FETCH_ACCOUNT_DATA',

  FETCH_MICROPOOLS: 'FETCH_MICROPOOLS',

  APPLY_FOR_PROVIDER: 'APPLY_FOR_PROVIDER',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',
};

export const UserActions = {
  connect: () => ({
    type: UserActionTypes.CONNECT,
  }),
  disconnect: () => ({
    type: UserActionTypes.DISCONNECT,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.disconnect();
      })(),
    },
  }),
  fetchAccountData: () => ({
    type: UserActionTypes.FETCH_ACCOUNT_DATA,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();

        const address = stkrSdk.getKeyProvider().currentAccount();
        const ankrBalance = await stkrSdk.getAnkrBalance();
        const ethereumBalance = await stkrSdk.getEtheremBalance();

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
  authorizeProvider: () => ({
    type: UserActionTypes.AUTHORIZE_PROVIDER,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.authorizeProvider();
      })(),
    },
  }),
};

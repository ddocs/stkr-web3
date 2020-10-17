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

  FETCH_CURRENT_PROVIDER_MICROPOOLS: 'FETCH_CURRENT_PROVIDER_MICROPOOLS',

  FETCH_CURRENT_PROVIDER_SIDECARS: 'FETCH_SIDECARS',

  APPLY_FOR_PROVIDER: 'APPLY_FOR_PROVIDER',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',

  CREATE_SIDECAR: 'CREATE_SIDECAR',

  CREATE_MICROPOOL: 'CREATE_MICROPOOL',
};

export const UserActions = {
  connect: () => ({
    type: UserActionTypes.CONNECT,
  }),
  // TODO Positive expectation response
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
          fee: new BigNumber('0'),
          currentStake: new BigNumber(item.balance),
          totalStake: new BigNumber(item.balance),
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
  fetchCurrentProviderMicropools: () => ({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_MICROPOOLS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk
          ?.getApiGateway()
          .getMicroPoolsByProvider(stkrSdk.getKeyProvider().currentAccount());
      })(),
    },
    meta: {
      getData: (data: MicroPoolReply[]): IPool[] => {
        return data.map(item => ({
          name: item.name,
          provider: item.provider,
          period: differenceInCalendarMonths(item.startTime, item.endTime),
          fee: new BigNumber(0),
          currentStake: new BigNumber(0),
          totalStake: new BigNumber(0),
          status: item.status,
        }));
      },
    },
  }),
  fetchCurrentProviderSidecars: () => ({
    type: UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk?.getProviderSidecars();
      })(),
    },
    meta: {
      getData: (data: MicroPoolReply[]): MicroPoolReply[] => {
        return data;
        /*return data.map(item => ({
          name: item.name,
          provider: item.provider,
          period: differenceInCalendarMonths(item.startTime, item.endTime),
          fee: new BigNumber(0),
          currentStake: new BigNumber(0),
          totalStake: new BigNumber(0),
          status: item.status,
        }));*/
      },
    },
  }),
  createSidecar: () => ({
    type: UserActionTypes.CREATE_SIDECAR,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.createSidecar();
      })(),
    },
  }),
  createMicropool: ({ name }: { name: string }) => ({
    type: UserActionTypes.CREATE_SIDECAR,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.createMicroPool(name);
      })(),
    },
  }),
};

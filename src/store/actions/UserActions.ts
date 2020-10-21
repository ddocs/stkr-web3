import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import BigNumber from 'bignumber.js';
import { MicroPoolReply, SidecarReply } from '../../modules/api/gateway';
import { IPool } from '../apiMappers/poolsApi';
import { differenceInCalendarMonths } from 'date-fns';
import { ISidecar, mapSidecar } from '../apiMappers/sidecarsApi';
import { mapStats } from '../apiMappers/statsApi';
import { IAllowance, IAllowTokensResponse } from '../apiMappers/allowance';

export const UserActionTypes = {
  CONNECT: 'CONNECT',
  CONNECT_SUCCESS: 'CONNECT_SUCCESS',

  DISCONNECT: 'DISCONNECT',
  DISCONNECT_SUCCESS: 'DISCONNECT_SUCCESS',

  FETCH_ACCOUNT_DATA: 'FETCH_ACCOUNT_DATA',

  FETCH_MICROPOOLS: 'FETCH_MICROPOOLS',

  FETCH_CURRENT_PROVIDER_MICROPOOLS: 'FETCH_CURRENT_PROVIDER_MICROPOOLS',

  FETCH_CURRENT_PROVIDER_SIDECARS: 'FETCH_SIDECARS',

  AUTHORIZE_PROVIDER: 'AUTHORIZE_PROVIDER',

  CREATE_SIDECAR: 'CREATE_SIDECAR',

  CREATE_MICROPOOL: 'CREATE_MICROPOOL',

  FETCH_STATS: 'FETCH_STATS',

  FETCH_ALLOWANCE: 'FETCH_ALLOWANCE',

  ALLOW_TOKENS: 'ALLOW_TOKENS',

  BUY_TOKENS: 'BUY_TOKENS',

  STAKE: 'STAKE',
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
        return stkrSdk.getApiGateway().getMicroPools();
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
          totalStake: new BigNumber('32'),
          status: item.status,
        })),
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
    meta: { asMutation: true },
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
          currentStake: new BigNumber(item.balance),
          totalStake: new BigNumber(32),
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
      getData: (data: SidecarReply[]): ISidecar[] => {
        return data.map(mapSidecar);
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
    meta: {
      asMutation: true,
      mutations: {
        [UserActionTypes.FETCH_CURRENT_PROVIDER_SIDECARS]: (
          data: ISidecar[],
          item: { sidecar: SidecarReply },
        ) => {
          return [...data, mapSidecar(item.sidecar)] as ISidecar[];
        },
      },
    },
  }),
  createMicropool: ({ name }: { name: string }) => ({
    type: UserActionTypes.CREATE_MICROPOOL,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        // TODO Remove log
        try {
          return await stkrSdk.createMicroPool(name);
        } catch (e) {
          console.error(e);
          throw e;
        }
      })(),
    },
    meta: { asMutation: true },
  }),
  fetchStats: () => ({
    type: UserActionTypes.FETCH_STATS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return await stkrSdk.getStats();
      })(),
    },
    meta: {
      getData: mapStats,
    },
  }),
  fetchAllowance: () => ({
    type: UserActionTypes.FETCH_ALLOWANCE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return {
          allowanceAmount: await stkrSdk.getAllowanceAmount(),
          remainingAllowance: await stkrSdk.getRemainingAllowance(),
        } as IAllowance;
      })(),
    },
  }),
  allowTokens: () => ({
    type: UserActionTypes.ALLOW_TOKENS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return { txHash: await stkrSdk.allowTokens() } as IAllowTokensResponse;
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  buyTokens: () => ({
    type: UserActionTypes.BUY_TOKENS,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk.faucet();
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
  stake: (amount: BigNumber | string) => ({
    type: UserActionTypes.STAKE,
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        return stkrSdk.stake(amount);
      })(),
    },
    meta: {
      asMutation: true,
    },
  }),
};

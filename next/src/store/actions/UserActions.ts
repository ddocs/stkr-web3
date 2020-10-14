import { IUserInfo } from '../apiMappers/userApi';
import { Providers } from '../../common/types';
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
        // const stkrSdk = StkrSdk.getLastInstance();
        //
        // if (!stkrSdk) {
        //   throw t('user-actions.error.sdk-not-initialized');
        // }
        //
        // const address = stkrSdk.getKeyProvider().currentAccount();
        //
        // await stkrSdk.getApiGateway().getEtheremBalance(address);

        return {
          address: '0x603366e08380EceB2E334621A27eeD36F34A9D50',
          walletType: Providers.metamask,
          ethereumBalance: new BigNumber(675765.786),
          ankrBalance: new BigNumber(6576765.7865685),
        } as IUserInfo;
      })(),
    },
  }),
  fetchMicropools: () => ({
    type: UserActionTypes.FETCH_MICROPOOLS,
    request: {
      promise: Promise.resolve([
        {
          id: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f#0',
          status: 'MICRO_POOL_STATUS_PENDING',
          provider: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f',
          name: 'helloworld',
          startTime: 1602335208,
          endTime: 0,
          rewardBalance: '0.000000000000000000',
          claimedBalance: '0.000000000000000000',
          compensatedBalance: '0.000000000000000000',
          providerOwe: '0.000000000000000000',
          totalStakedAmount: '0.000000000000000000',
          numberOfSlashing: 0,
          nodeFee: '0.000000000000000000',
          totalSlashedAmount: '0.000000000000000000',
          validator: '0x0000000000000000000000000000000000000000',
          created: 1602613183455,
        },
        {
          id: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f#1',
          status: 'MICRO_POOL_STATUS_PENDING',
          provider: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f',
          name: 'test',
          startTime: 1602528574,
          endTime: 0,
          rewardBalance: '0.000000000000000000',
          claimedBalance: '0.000000000000000000',
          compensatedBalance: '0.000000000000000000',
          providerOwe: '0.000000000000000000',
          totalStakedAmount: '0.000000000000000000',
          numberOfSlashing: 0,
          nodeFee: '0.000000000000000000',
          totalSlashedAmount: '0.000000000000000000',
          validator: '0x0000000000000000000000000000000000000000',
          created: 1602613186024,
        },
        {
          id: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f#2',
          status: 'MICRO_POOL_STATUS_PENDING',
          provider: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f',
          name: 'new-pool',
          startTime: 1602532145,
          endTime: 0,
          rewardBalance: '0.000000000000000000',
          claimedBalance: '0.000000000000000000',
          compensatedBalance: '0.000000000000000000',
          providerOwe: '0.000000000000000000',
          totalStakedAmount: '0.000000000000000000',
          numberOfSlashing: 0,
          nodeFee: '0.000000000000000000',
          totalSlashedAmount: '0.000000000000000000',
          validator: '0x0000000000000000000000000000000000000000',
          created: 1602613186027,
        },
        {
          id: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f#3',
          status: 'MICRO_POOL_STATUS_PENDING',
          provider: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f',
          name: '123',
          startTime: 1602532220,
          endTime: 0,
          rewardBalance: '0.000000000000000000',
          claimedBalance: '0.000000000000000000',
          compensatedBalance: '0.000000000000000000',
          providerOwe: '0.000000000000000000',
          totalStakedAmount: '0.000000000000000000',
          numberOfSlashing: 0,
          nodeFee: '0.000000000000000000',
          totalSlashedAmount: '0.000000000000000000',
          validator: '0x0000000000000000000000000000000000000000',
          created: 1602613186030,
        },
        {
          id: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f#4',
          status: 'MICRO_POOL_STATUS_PENDING',
          provider: '0xb827bca9cf96f58a7bed49d9b5cbd84fed72b03f',
          name: '321',
          startTime: 1602532295,
          endTime: 0,
          rewardBalance: '0.000000000000000000',
          claimedBalance: '0.000000000000000000',
          compensatedBalance: '0.000000000000000000',
          providerOwe: '0.000000000000000000',
          totalStakedAmount: '0.000000000000000000',
          numberOfSlashing: 0,
          nodeFee: '0.000000000000000000',
          totalSlashedAmount: '0.000000000000000000',
          validator: '0x0000000000000000000000000000000000000000',
          created: 1602613186033,
        },
      ]),
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

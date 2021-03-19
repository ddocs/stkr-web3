import { createAction as createSmartAction } from 'redux-smart-actions';
import {
  getBnbAccountData,
  getStakingBalance,
  getStakingHistory,
  getValidator,
} from '../api/apiBinance';
import BigNumber from 'bignumber.js';
import { getBep2Address, getBnbAccounts } from '../api/binanceWalletApi';

const VALIDATOR_ADDRESS = 'bva1xnudjls7x4p48qrk0j247htt7rl2k2dzp3mr3j';

export interface IBnbStatsData {
  walletBalance: BigNumber;
  delegated: BigNumber;
  rewardsAmount: BigNumber;
  commissionRate: BigNumber;
  apr: BigNumber;
}

export const StakeBnbActions = {
  connect: createSmartAction('CONNECT_BNB', () => ({
    request: {
      promise: (async function () {
        return await getBnbAccounts();
      })(),
    },
  })),
  fetchStats: createSmartAction('FETCH_STATS_BNB', (accountId: string) => ({
    request: {
      promise: (async function () {
        const { address } = await getBep2Address(accountId);
        const accountData = await getBnbAccountData(address);
        const balance = accountData.balances.find(
          item => item.symbol === 'BNB',
        );

        if (!balance) {
          throw new Error('Balance is not found');
        }

        const [
          { delegated, rewardsAmount },
          { commissionRate, apr },
        ] = await Promise.all([
          await getStakingBalance(address),
          await getValidator(VALIDATOR_ADDRESS),
        ]);

        return {
          walletBalance: balance.free,
          delegated,
          rewardsAmount,
          commissionRate,
          apr,
        } as IBnbStatsData;
      })(),
    },
  })),
  fetchStakingHistory: createSmartAction(
    'FETCH_BNB_STAKING_HISTORY',
    (accountId: string) => ({
      request: {
        promise: (async function () {
          const { address } = await getBep2Address(accountId);
          return getStakingHistory(address);
        })(),
      },
    }),
  ),
  delegate: createSmartAction(
    'DELEGATE_BNB',
    (accountId: string, amount: number) => ({
      request: {
        promise: (async function () {
          const { address } = await getBep2Address(accountId);

          return await window.BinanceChain.delegate({
            amount: amount,
            delegatorAddress: address,
            validatorAddress: 'bva1xnudjls7x4p48qrk0j247htt7rl2k2dzp3mr3j',
            validatorName: 'Ankr_BSC_validator_1',
            networkId: 'bbc-mainnet',
            accountId: accountId,
          });
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  undelegate: createSmartAction(
    'UNDELEGATE_BNB',
    (accountId: string, amount: number) => ({
      request: {
        promise: (async function () {
          const { address } = await getBep2Address(accountId);

          return await window.BinanceChain.undelegate({
            amount: amount,
            delegatorAddress: address,
            validatorAddress: 'bva1xnudjls7x4p48qrk0j247htt7rl2k2dzp3mr3j',
            validatorName: 'Ankr_BSC_validator_1',
            networkId: 'bbc-mainnet',
            accountId: accountId,
          });
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
};

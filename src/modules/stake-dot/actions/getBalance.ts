import { TNetworkType } from '@ankr.com/stakefi-polkadot';
import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction as createSmartAction } from 'redux-smart-actions';

export interface IBalanceReply {
  total: string;
  claimable: string;
}

export interface IBalance {
  total: BigNumber;
  claimable: BigNumber;
}

export interface IGetBalanceArgs {
  network: TNetworkType;
  address: string;
}

export const getBalance = createSmartAction<
  RequestAction<IBalanceReply, IBalance>,
  [IGetBalanceArgs]
>('POLKADOT_BALANCE', ({ network, address }) => ({
  request: {
    url: `/v1alpha/polkadot/balance`,
    method: 'get',
    params: {
      network,
      address,
    },
  },
  meta: {
    asMutation: false,
    driver: 'axios',
    getData: data => {
      return {
        total: new BigNumber(data.total),
        claimable: new BigNumber(data.claimable),
      };
    },
  },
}));

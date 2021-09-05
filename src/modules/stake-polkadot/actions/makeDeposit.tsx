import { RequestAction } from '@redux-requests/core';
import { createAction as createSmartAction } from 'redux-smart-actions';

export interface IPolkadotDepositRequest {
  network: string;
  /**
   * example - `5800549-2`
   */
  extrinsic: string;
}

export interface IPolkadotDepositReply {
  id: string;
  status: 'PENDING' | string;
}

interface IMakeDepositArgs {
  network: string;
  extrinsicId: string;
}

/**
 * Part of [DOT/KSM staking](https://ankrnetwork.atlassian.net/wiki/spaces/SP/pages/1646428256/Technical+description+of+staking+process+backend+-+frontend+-+contract+protocol#Stake-DOT%2FKSM).
 *
 * Sends extrinsic id to our backend.
 */
export const makeDeposit = createSmartAction<
  RequestAction<IPolkadotDepositReply, IPolkadotDepositReply>,
  [IMakeDepositArgs]
>('POLKADOT_DEPOSIT', ({ network, extrinsicId }) => ({
  request: {
    url: `/v1alpha/polkadot/deposit`,
    method: 'post',
    data: {
      network: network.toUpperCase(),
      extrinsic: extrinsicId,
    } as IPolkadotDepositRequest,
  },
  meta: {
    driver: 'axios',
    asMutation: true,
  },
}));

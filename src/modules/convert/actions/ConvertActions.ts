import { StkrSdk } from '../../api';
import { BridgeSdk } from '../../bridge-sdk';
import { createAction } from 'redux-smart-actions';
import { IConversionStats } from '../api/convertApi';

export const ConvertActions = {
  fetchConversionStats: createAction('FETCH_CONVERSION_STATS', () => ({
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const bridgeSdk = new BridgeSdk(stkrSdk);

        const availablePegETH = await bridgeSdk.getPegEthBalance();

        const latestDepositInProgressSwap = await bridgeSdk.getLatestDepositInProgressSwap();
        const latestConfirms = latestDepositInProgressSwap
          ? await bridgeSdk.calcSwapConfirms(latestDepositInProgressSwap)
          : undefined;

        const latestWaitingForDepositSwap = await bridgeSdk.getLatestWaitingForDepositSwap();

        return {
          availablePegETH,
          latestConfirms,
          latestWaitingForDepositSwap,
        } as IConversionStats;
      })(),
    },
  })),
  convert: createAction('CONVERT', (amount: number) => ({
    request: {
      promise: (async function () {
        const stkrSdk = StkrSdk.getLastInstance();
        const bridgeSdk = new BridgeSdk(stkrSdk);
        const result = await bridgeSdk.swapPegEthToEthForBEP20(amount);
        const txResult = await bridgeSdk.sendPegEthToBEP20(
          result.amount,
          result.depositAddress,
        );
        return { transactionHash: txResult.transactionHash };
      })(),
    },
    meta: {
      asMutation: true,
    },
  })),
  deposit: createAction(
    'DEPOSIT',
    (depositAddress: string, amount: number) => ({
      request: {
        promise: (async function () {
          const stkrSdk = StkrSdk.getLastInstance();
          const bridgeSdk = new BridgeSdk(stkrSdk);
          const txResult = await bridgeSdk.sendPegEthToBEP20(
            amount,
            depositAddress,
          );
          return { transactionHash: txResult.transactionHash };
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
};

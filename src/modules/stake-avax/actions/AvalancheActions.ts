import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { routerActions } from 'connected-react-router';
import { stringify } from 'querystring';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { isMainnet } from '../../../common/const';
import { BlockchainNetworkId, Timestamp } from '../../../common/types';
import { t } from '../../../common/utils/intl';
import { sleep } from '../../../common/utils/sleep';
import { IApplicationStore } from '../../../store/createStore';
import { StkrSdk } from '../../api';
import { configFromEnv } from '../../api/config';
import { AvalancheSdk } from '../api';
import {
  AvalancheEventsHistory,
  IDepositTxn,
} from '../api/AvalancheEventsHistory';
import {
  IClaimPayload,
  IClaimStats,
  IConvertPayload,
  IStakerStats,
  IWalletStatus,
  IWalletWithdrawalAAvaxB,
  StakingStep,
} from '../api/types';
import { msToEstimate, retry } from '../api/utils';

const {
  providerConfig: { ethereumChainId, binanceChainId, avalancheChainId },
  avalancheConfig: { futureBondAVAX: avalancheAAvaxB },
  contractConfig: { futureBondAVAX: ethAAvaxB },
  binanceConfig: { futureBondAVAX: bnbAAvaxB },
} = configFromEnv();

export const AvalancheActions = {
  fetchTransactionStatus: createAction<
    RequestAction<IWalletStatus, IWalletStatus>
  >(
    'FETCH_TRANSACTION_STATUS',
    (): RequestAction => ({
      request: {
        promise: (async () => null)(),
      },
      meta: {
        getData: data => data,
        onRequest: (
          _request: { promise: Promise<any> },
          _action: RequestAction,
          store: Store<IApplicationStore> & {
            dispatchRequest: DispatchRequest;
          },
        ) => {
          return {
            promise: (async function (): Promise<IWalletStatus> {
              const stkrSdk = StkrSdk.getForEnv();

              const currentChainId = await stkrSdk
                .getKeyProvider()
                .getWeb3()
                .eth.getChainId();

              const currentAccount = stkrSdk.currentAccount();

              const {
                router: { location },
              } = store.getState();

              const query = (location as any).query;

              if (
                query.recipient === currentAccount &&
                +query.requiredNetwork === currentChainId
              ) {
                return {
                  step: StakingStep.WithdrawalAAvaxB,
                  requiredNetwork: +query.requiredNetwork,
                  currentChainId: +query.currentChainId,
                  isConnected: true,
                  amount: new BigNumber(query.amount),
                  recipient: query.recipient,
                  signature: query.signature,
                  txHash: query.txHash,
                  fromAddress: query.fromAddress,
                };
              }

              const avalancheEventsHistory = new AvalancheEventsHistory(
                currentChainId,
              );

              if (
                currentChainId === BlockchainNetworkId.avalanche ||
                currentChainId === BlockchainNetworkId.avalancheTestnet
              ) {
                const [
                  uncompletedTransaction,
                ] = await avalancheEventsHistory.getUncompletedAvalancheTxs(
                  currentAccount,
                  currentChainId,
                );

                if (uncompletedTransaction) {
                  const { signature, amount } = await retry<{
                    signature: string;
                    amount: string;
                    recipient: string;
                  }>(
                    () =>
                      // TODO memoize
                      stkrSdk.notarizeTransfer(
                        'AVAX',
                        uncompletedTransaction.txHash,
                      ),
                    e => e.message && e.message.includes('blocks more'),
                  );

                  return {
                    step: StakingStep.AwaitingSwitchNetwork,
                    requiredNetwork: uncompletedTransaction.toChain,
                    currentChainId,
                    amount: new BigNumber(Web3.utils.fromWei(amount)),
                    depositAmount: uncompletedTransaction.depositAmount,
                    recipient: uncompletedTransaction.toAddress,
                    signature,
                    txHash: uncompletedTransaction.txHash,
                    fromAddress: uncompletedTransaction.fromAddress,
                  };
                }

                return {
                  step: StakingStep.Stake,
                  requiredNetwork: avalancheChainId,
                  currentNetwork: currentChainId,
                };
              } else {
                const isBinanceChain = currentChainId === binanceChainId;
                let uncompletedTransaction: IDepositTxn;

                if (isBinanceChain) {
                  const [
                    uncompletedBscTx,
                  ] = await avalancheEventsHistory.getUncompletedBscTxs(
                    currentAccount,
                    currentChainId,
                  );
                  uncompletedTransaction = uncompletedBscTx;
                } else {
                  const [
                    uncompletedEthTx,
                  ] = await avalancheEventsHistory.getUncompletedEthTxs(
                    currentAccount,
                    currentChainId,
                  );
                  uncompletedTransaction = uncompletedEthTx;
                }

                if (uncompletedTransaction) {
                  const fromNetwork = isBinanceChain ? 'BSC' : 'ETH';

                  const { signature, amount } = await retry<{
                    signature: string;
                    amount: string;
                  }>(
                    () =>
                      // TODO memoize if successful
                      stkrSdk.notarizeTransfer(
                        fromNetwork,
                        uncompletedTransaction.txHash,
                      ),
                    e => e.message && e.message.includes('blocks more'),
                  );

                  return {
                    step: StakingStep.AwaitingSwitchNetwork,
                    requiredNetwork: uncompletedTransaction.toChain,
                    currentChainId,
                    amount: new BigNumber(Web3.utils.fromWei(amount)),
                    depositAmount: uncompletedTransaction.depositAmount,
                    recipient: uncompletedTransaction.toAddress,
                    signature,
                    txHash: uncompletedTransaction.txHash,
                    fromAddress: uncompletedTransaction.fromAddress,
                  };
                }

                return {
                  step: StakingStep.HoldExternalWallet,
                };
              }
            })(),
          };
        },
        onSuccess: (response, _action, store) => {
          if (response.data.step === StakingStep.AwaitingSwitchNetwork) {
            const pathname = store.getState().router.location.pathname;
            store.dispatch(
              routerActions.replace({
                pathname,
                search: stringify({
                  ...response.data,
                  amount: response.data?.amount?.toFixed(),
                  depositAmount: response.data?.depositAmount?.toFixed(),
                }),
              }),
            );
          }

          return response;
        },
      },
    }),
  ),
  stake: createAction(
    'STAKE_AVAX',
    ({ amount }): RequestAction => ({
      request: {
        promise: (async () => {
          const avalancheSdk = await AvalancheSdk.connect();
          await avalancheSdk.stake(amount.toString());
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  depositToAvalancheBridge: createAction(
    'DEPOSIT_TO_AVA_BRIDGE',
    (payload: IClaimPayload): RequestAction => ({
      request: {
        promise: (async (): Promise<IWalletStatus> => {
          const stkrSdk = StkrSdk.getForEnv();

          const isToBNB = payload.network === binanceChainId;

          const toChain = isToBNB ? binanceChainId : ethereumChainId;
          const toToken = isToBNB ? `${bnbAAvaxB}` : `${ethAAvaxB}`;

          const { transactionHash } = await stkrSdk.crossDeposit(
            avalancheAAvaxB,
            toToken,
            `${toChain}`,
            payload.address,
            new BigNumber(payload.amount),
          );

          const address = stkrSdk.currentAccount();

          try {
            const stkrSdk = StkrSdk.getForEnv();
            const { signature, amount, recipient } = await retry<{
              signature: string;
              amount: string;
              recipient: string;
            }>(
              () => stkrSdk.notarizeTransfer('AVAX', `${transactionHash}`),
              e => e.message && e.message.includes('blocks more'),
            );

            const currentChainId = await stkrSdk
              .getKeyProvider()
              .getWeb3()
              .eth.getChainId();

            return {
              step: StakingStep.AwaitingSwitchNetwork,
              requiredNetwork: toChain,
              currentChainId,
              amount: new BigNumber(Web3.utils.fromWei(amount)),
              depositAmount: new BigNumber(payload.amount),
              recipient,
              signature,
              txHash: transactionHash,
              fromAddress: address,
            };
          } catch (e) {
            throw e;
          }
        })(),
      },
      meta: {
        asMutation: true,
        mutations: {
          [AvalancheActions.fetchTransactionStatus.toString()]: (
            data,
            mutationData,
          ) => {
            return mutationData;
          },
        },
        onSuccess: (response, action, store) => {
          const pathname = store.getState().router.location.pathname;
          store.dispatch(
            routerActions.replace({
              pathname,
              search: stringify({
                ...response.data,
                amount: response.data?.amount?.toFixed(),
                depositAmount: response.data?.depositAmount?.toFixed(),
              }),
            }),
          );
          return response;
        },
      },
    }),
  ),
  withdrawFromAvalancheBridge: createAction(
    'WITHDRAW_FROM_AVA_BRIDGE',
    ({
      txHash,
      amount,
      signature,
      fromAddress,
      recipient,
      requiredNetwork,
    }: Omit<IWalletWithdrawalAAvaxB, 'step'>): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();

          const address = stkrSdk.currentAccount();
          if (address !== recipient) {
            throw new Error(t('stake-avax.error.to-address'));
          }

          const isToBNB = requiredNetwork === binanceChainId;

          const toToken = isToBNB ? `${bnbAAvaxB}` : `${ethAAvaxB}`;

          const {
            receiptPromise,
            transactionHash,
          } = await stkrSdk.crossWithdrawAsync(
            avalancheAAvaxB,
            toToken,
            `${avalancheChainId}`,
            fromAddress,
            Web3.utils.toWei(amount.toFixed()),
            txHash,
            signature,
          );

          await receiptPromise;

          return transactionHash;
        })(),
      },
      meta: {
        asMutation: true,
        mutations: {
          [AvalancheActions.fetchTransactionStatus.toString()]: () => {
            return {
              step: StakingStep.HoldExternalWallet,
            };
          },
        },
        onSuccess: (response, action, store) => {
          const pathname = store.getState().router.location.pathname;
          store.dispatch(
            routerActions.replace({
              pathname,
            }),
          );
          return response;
        },
      },
    }),
  ),
  // todo: need to merge with fetchClaimServeTime
  // now this function is unused
  getConversionEstimate: createAction(
    'ESTIMATE_CONVERT_AAVAXB',
    ({ amount, address }: IConvertPayload): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();
          const {
            validationEndTime,
            amountAvailable,
          } = await stkrSdk.getConversionEstimate(amount, 'AVAX');

          return {
            estimate: msToEstimate(validationEndTime),
            amount: new BigNumber(amountAvailable).dividedBy(
              new BigNumber(10).pow(18),
            ),
            address,
          };
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  /**
   * Deposit to binance or eth bridge
   */
  depositToBridge: createAction(
    'DEPOSIT_TO_BRIDGE',
    ({ amount: confirmedAmount, address }: IConvertPayload): RequestAction => ({
      request: {
        promise: (async (): Promise<IWalletStatus> => {
          const stkrSdk = StkrSdk.getForEnv();

          const currentChainId = await stkrSdk
            .getKeyProvider()
            .getWeb3()
            .eth.getChainId();
          const isFromBNB = currentChainId === binanceChainId;
          const fromToken = isFromBNB ? bnbAAvaxB : ethAAvaxB;
          const currentAddress = stkrSdk.currentAccount();

          if (!fromToken) {
            throw new Error('Contract configuration not available');
          }

          const { transactionHash } = await stkrSdk.crossDeposit(
            fromToken,
            avalancheAAvaxB,
            `${avalancheChainId}`,
            address,
            new BigNumber(confirmedAmount),
          );

          // This takes a sleep approach because we need to wait
          // until 12 blocks are mined in the production environment.
          // Before it happens, notarization will be useless.
          await sleep(isMainnet ? 50_000 : 0);

          try {
            const fromNetwork = isFromBNB ? 'BSC' : 'ETH';
            const { signature, amount, recipient } = await retry<{
              signature: string;
              amount: string;
              recipient: string;
            }>(
              () => stkrSdk.notarizeTransfer(fromNetwork, `${transactionHash}`),
              e => e.message && e.message.includes('1 blocks more'),
            );

            return {
              step: StakingStep.AwaitingSwitchNetwork,
              requiredNetwork: avalancheChainId,
              currentChainId,
              amount: new BigNumber(Web3.utils.fromWei(amount)),
              depositAmount: new BigNumber(confirmedAmount),
              recipient,
              signature,
              txHash: transactionHash,
              fromAddress: currentAddress,
            };
          } catch (e) {
            throw e;
          }
        })(),
      },
      meta: {
        asMutation: true,
        mutations: {
          [AvalancheActions.fetchTransactionStatus.toString()]: (
            data,
            mutationData,
          ) => {
            return mutationData;
          },
        },
        onSuccess: (response, action, store) => {
          const pathname = store.getState().router.location.pathname;
          store.dispatch(
            routerActions.replace({
              pathname,
              search: stringify({
                ...response.data,
                amount: response.data?.amount?.toFixed(),
                depositAmount: response.data?.depositAmount?.toFixed(),
              }),
            }),
          );
          return response;
        },
      },
    }),
  ),
  /**
   * Can be used with connected Avalanche network.
   * Withdraw aAVAXb from binance or eth bridge to the Avalanche network.
   */
  withdrawFromBridge: createAction(
    'WITHDRAW_FROM_BRIDGE',
    ({
      amount,
      txHash,
      signature,
      fromAddress,
    }: {
      amount: BigNumber;
      txHash: string;
      signature: string;
      fromAddress: string;
    }): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();
          const currentChainId = await stkrSdk
            .getKeyProvider()
            .getWeb3()
            .eth.getChainId();

          const isFromBNB = currentChainId === binanceChainId;

          const fromToken = isFromBNB ? `${bnbAAvaxB}` : `${ethAAvaxB}`;
          const fromChain = isFromBNB
            ? String(binanceChainId)
            : String(ethereumChainId);

          const {
            receiptPromise,
            transactionHash,
          } = await stkrSdk.crossWithdrawAsync(
            fromToken,
            avalancheAAvaxB,
            fromChain,
            fromAddress,
            Web3.utils.toWei(amount.toFixed()),
            txHash,
            signature,
          );

          await receiptPromise;

          return transactionHash;
        })(),
      },
      meta: {
        asMutation: true,
        mutations: {
          [AvalancheActions.fetchTransactionStatus.toString()]: () => {
            return {
              step: StakingStep.Stake,
            };
          },
        },
        onSuccess: (response, action, store) => {
          const pathname = store.getState().router.location.pathname;
          store.dispatch(
            routerActions.replace({
              pathname,
            }),
          );
          return response;
        },
      },
    }),
  ),
  /**
   * Also known as unstake AVAX
   */
  claimAvax: createAction<RequestAction<any, any>>(
    'CLAIM_AVAX',
    (amount: string) => ({
      request: {
        promise: (async () => {
          const avalancheSdk = await AvalancheSdk.connect();
          return await avalancheSdk.claim(amount);
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  fetchStakerStats: createAction(
    'FETCH_STAKER_STATS',
    (): RequestAction => ({
      request: {
        promise: (async (): Promise<IStakerStats> => {
          const avalancheSdk = await AvalancheSdk.connect();
          const claimAvailable = await avalancheSdk.getClaimableAmount();
          const balance = await avalancheSdk.getNativeBalance();
          // const stats = await avalancheSdk.fetchStakeLogs();

          return {
            history: [],
            balance,
            claimAvailable,
          };
        })(),
      },
    }),
  ),
  fetchClaimStats: createAction<RequestAction<any, IClaimStats>>(
    'FETCH_CLAIM_STATS',
    () => ({
      request: {
        promise: (async (): Promise<IClaimStats> => {
          const avalancheSdk = await AvalancheSdk.connect();
          const balance = await avalancheSdk.getAAvaxBBalance();

          return {
            history: [],
            balance,
          };
        })(),
      },
    }),
  ),
  fetchEstimatedAPY: createAction<
    RequestAction<{ apy: string; timestamp: Timestamp }, BigNumber>
  >('FETCH_ESTIMATED_APY', () => ({
    request: {
      url: `/v1alpha/avax/estimatedapy`,
      method: 'get',
    },
    meta: {
      driver: 'axios',
      asMutation: false,
      // apy - can be 'NaN%'
      getData: data => new BigNumber(data.apy.slice(0, -1)),
    },
  })),
  fetchClaimServeTime: createAction<
    RequestAction<{ validationEndTime: number }, Date>
  >('FETCH_CLAIM_SERVE_TIME', () => ({
    request: {
      url: `/v1alpha/avax/claimservetime`,
      method: 'get',
    },
    meta: {
      driver: 'axios',
      asMutation: false,
      getData: data => new Date(data.validationEndTime * 1000), // to milliseconds
    },
  })),

  fetchUnstakedBalance: createAction<RequestAction<any, BigNumber>>(
    'FETCH_UNSTAKED_BALANCE',
    () => ({
      request: {
        promise: (async () => {
          const avalancheSdk = await AvalancheSdk.connect();
          return await avalancheSdk.getUnstakedBalance();
        })(),
      },
      meta: {
        asMutation: false,
      },
    }),
  ),
};

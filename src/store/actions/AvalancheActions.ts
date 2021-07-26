import { DispatchRequest, RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { routerActions } from 'connected-react-router';
import { stringify } from 'querystring';
import { Store } from 'redux';
import { createAction } from 'redux-smart-actions';
import Web3 from 'web3';
import { BlockchainNetworkId } from '../../common/types';
import { t } from '../../common/utils/intl';
import { StkrSdk } from '../../modules/api';
import { configFromEnv } from '../../modules/api/config';
import { AvalancheSdk } from '../../modules/avalanche-sdk';
import { AvalancheEventsHistory } from '../../modules/avalanche-sdk/AvalancheEventsHistory';
import {
  IClaimPayload,
  IClaimStats,
  IConvertPayload,
  IStakerStats,
  IWalletStatus,
  IWalletWithdrawalAAvaxB,
  StakingStep,
} from '../../modules/avalanche-sdk/types';
import {
  clearStakingSession,
  getStakingSession,
  msToEstimate,
  retry,
} from '../../modules/avalanche-sdk/utils';
import { IApplicationStore } from '../createStore';

const {
  providerConfig: { ethereumChainId, binanceChainId, avalancheChainId },
  avalancheConfig: { futureBondAVAX: avalancheAAvaxB },
  contractConfig: { futureBondAVAX: ethAAvaxB },
  binanceConfig: { futureBondAVAX: bnbAAvaxB },
} = configFromEnv();

export const AvalancheActions = {
  checkWallet: createAction<RequestAction<IWalletStatus, IWalletStatus>>(
    'CHECK_WALLET',
    (): RequestAction => ({
      request: {
        promise: (async () => null)(),
      },
      meta: {
        getData: data => data,
        onRequest: (
          request: { promise: Promise<any> },
          action: RequestAction,
          store: Store<IApplicationStore> & {
            dispatchRequest: DispatchRequest;
          },
        ) => {
          return {
            promise: (async function () {
              const stkrSdk = StkrSdk.getForEnv();

              const currentChainId = await stkrSdk
                .getKeyProvider()
                .getWeb3()
                .eth.getChainId();

              const currentAccount = stkrSdk.currentAccount();

              if (
                currentChainId === BlockchainNetworkId.avalanche ||
                currentChainId === BlockchainNetworkId.avalancheTestnet
              ) {
                const avalancheEventsHistory = new AvalancheEventsHistory(
                  currentChainId,
                );

                const [
                  uncompletedTransaction,
                ] = await avalancheEventsHistory.getUncompletedTransactions(
                  currentAccount,
                  currentChainId,
                );

                if (uncompletedTransaction) {
                  const stkrSdk = StkrSdk.getForEnv();
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
              }

              const {
                router: { location },
              } = store.getState();

              const query = (location as any).query;

              if (query.recipient === currentAccount) {
                return {
                  step: StakingStep.WithdrawalAAvaxB,
                  requiredNetwork: currentChainId,
                  currentChainId,
                  isConnected: true,
                  amount: new BigNumber(query.amount),
                  recipient: query.recipient,
                  signature: query.signature,
                  txHash: query.txHash,
                  fromAddress: query.fromAddress,
                };
              }

              return {
                step: StakingStep.HoldExternalWallet,
              };
            })(),
          };
        },
        onSuccess: (response, action, store) => {
          if (response.data.step === StakingStep.AwaitingSwitchNetwork) {
            const pathname = store.getState().router.location.pathname;
            store.dispatch(
              routerActions.replace({
                pathname,
                search: stringify({
                  ...response.data,
                  amount: response.data?.amount?.toFixed(),
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
  claimAAvaxB: createAction(
    'CLAIM_AAVAXB',
    (payload: IClaimPayload): RequestAction => ({
      request: {
        promise: (async () => {
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
          [AvalancheActions.checkWallet.toString()]: (data, mutationData) => {
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
              }),
            }),
          );
          return response;
        },
      },
    }),
  ),
  withdrawAAvaxB: createAction(
    'WITHDRAW_AAVAXB',
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
          [AvalancheActions.checkWallet.toString()]: () => {
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
  estimateConvert: createAction(
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
  convert: createAction(
    'CONVERT_AAVAXB_TO_AVAX',
    ({ amount: confirmedAmount, address }: IConvertPayload): RequestAction => ({
      request: {
        promise: (async () => {
          const session = getStakingSession();
          if (!session?.network) {
            throw new Error(t('stake-avax.error.transaction-info'));
          }

          const stkrSdk = StkrSdk.getForEnv();

          const currentChainId = await stkrSdk
            .getKeyProvider()
            .getWeb3()
            .eth.getChainId();
          const isFromBNB = currentChainId === binanceChainId;
          const fromToken = isFromBNB ? bnbAAvaxB : ethAAvaxB;

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

          try {
            const stkrSdk = StkrSdk.getForEnv();
            const fromNetwork = isFromBNB ? 'BSC' : 'ETH';
            const { signature, amount } = await retry<{
              signature: string;
              amount: string;
            }>(
              () => stkrSdk.notarizeTransfer(fromNetwork, `${transactionHash}`),
              e => e.message && e.message.includes('1 blocks more'),
            );
            // TODO Remove
            console.log(signature, amount);
          } catch (e) {
            throw e;
          }
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  withdrawAvax: createAction(
    'WITHDRAW_AVAX',
    (): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();

          const session = getStakingSession();

          if (
            !session ||
            !session.transactionHash ||
            !session.amount ||
            !session.signature
          ) {
            throw new Error(t('stake-avax.error.transaction-info'));
          }
          const isFromBNB = session.network === String(binanceChainId);

          const fromToken = isFromBNB ? `${bnbAAvaxB}` : `${ethAAvaxB}`;
          const fromChain = isFromBNB
            ? String(binanceChainId)
            : String(ethereumChainId);

          await stkrSdk.crossWithdrawAsync(
            fromToken,
            avalancheAAvaxB,
            fromChain,
            null,
            session.amount,
            session.transactionHash,
            session.signature,
          );
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  claimAvax: createAction(
    'CLAIM_AVAX',
    (): RequestAction => ({
      request: {
        promise: (async () => {
          const avalancheSdk = await AvalancheSdk.connect();
          const session = getStakingSession();
          if (!session || !session.amount) {
            throw new Error(t('stake-avax.error.transaction-info'));
          }
          await avalancheSdk.claim(session.amount);
          clearStakingSession();
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
  fetchClaimStats: createAction(
    'FETCH_CLAIM_STATS',
    (): RequestAction => ({
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
  fetchEstimatedAPY: createAction<RequestAction<any, BigNumber>>(
    'FETCH_ESTIMATED_APY',
    () => ({
      request: {
        url: `/v1alpha/avax/estimatedapy`,
        method: 'get',
      },
      meta: {
        driver: 'axios',
        asMutation: false,
        getData: data => new BigNumber(data.apy.slice(0, -1)),
      },
    }),
  ),
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
};

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { StkrSdk } from '../../modules/api';
import { configFromEnv } from '../../modules/api/config';
import { AvalancheSdk } from '../../modules/avalanche-sdk';
import {
  IClaimPayload,
  IClaimStats,
  IConvertPayload,
  IStakerStats,
  IWalletStatus,
  StakingStep,
} from '../../modules/avalanche-sdk/types';
import {
  clearStakingSession,
  getStakingSession,
  msToEstimate,
  retry,
  saveStakingSession,
  setSessionInProgress,
} from '../../modules/avalanche-sdk/utils';
import { t } from '../../common/utils/intl';
import Web3 from 'web3';

const {
  providerConfig: { ethereumChainId, binanceChainId, avalancheChainId },
  avalancheConfig: { futureBondAVAX: avalancheAAvaxB },
  contractConfig: { futureBondAVAX: ethAAvaxB },
  binanceConfig: { futureBondAVAX: bnbAAvaxB },
} = configFromEnv();

export const AvalancheActions = {
  checkWallet: createAction(
    'CHECK_WALLET',
    (): RequestAction => ({
      request: {
        promise: (async (): Promise<IWalletStatus> => {
          const stkrSdk = StkrSdk.getForEnv();
          const session = getStakingSession();

          const defaultState = {
            step: StakingStep.Stake,
            requiredNetwork: String(avalancheChainId),
          };

          const selectedChainId = await stkrSdk
            .getKeyProvider()
            .getWeb3()
            .eth.getChainId();

          if (!session || !session.nextStep) {
            clearStakingSession();
            return {
              ...defaultState,
              isConnected: String(selectedChainId) === String(avalancheChainId),
            };
          }

          if (session.nextStep === StakingStep.DepositAvax) {
            return {
              step: StakingStep.WithdrawAAvaxB,
              requiredNetwork: String(selectedChainId),
              isConnected: true,
            };
          }

          if (
            [StakingStep.WithdrawAAvaxB, StakingStep.NotarizeAvax].includes(
              session.nextStep,
            )
          ) {
            if (!session.network) {
              clearStakingSession();
              return {
                ...defaultState,
                isConnected: false,
              };
            } else {
              return {
                step: StakingStep.WithdrawAAvaxB,
                requiredNetwork: session.network,
                isConnected: String(selectedChainId) === session.network,
                amount: session.amount
                  ? new BigNumber(Web3.utils.fromWei(session.amount))
                  : undefined,
                recipient: session.recipient,
              };
            }
          } else {
            return {
              ...defaultState,
              isConnected: String(selectedChainId) === String(avalancheChainId),
            };
          }
        })(),
      },
    }),
  ),
  stake: createAction(
    'STAKE_AVAX',
    ({ amount }): RequestAction => ({
      request: {
        promise: (async () => {
          saveStakingSession(
            {
              nextStep: StakingStep.Stake,
            },
            true,
          );
          const avalancheSdk = await AvalancheSdk.connect();
          await avalancheSdk.stake(amount.toString());
          saveStakingSession({
            nextStep: StakingStep.DepositAAvaxB,
          });
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
          saveStakingSession(
            {
              nextStep: StakingStep.DepositAAvaxB,
            },
            true,
          );
          const stkrSdk = StkrSdk.getForEnv();

          const isToBNB = payload.network === binanceChainId;

          const toChain = isToBNB ? `${binanceChainId}` : `${ethereumChainId}`;
          const toToken = isToBNB ? `${bnbAAvaxB}` : `${ethAAvaxB}`;

          const { transactionHash } = await stkrSdk.crossDeposit(
            avalancheAAvaxB,
            toToken,
            toChain,
            payload.address,
            new BigNumber(payload.amount),
          );

          const address = stkrSdk.currentAccount();

          saveStakingSession({
            nextStep: StakingStep.NotarizeAAvaxB,
            transactionHash,
            from: address,
            network: `${payload.network}`,
          });

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

            saveStakingSession({
              nextStep: StakingStep.WithdrawAAvaxB,
              transactionHash,
              from: address,
              recipient,
              amount,
              signature,
              network: `${payload.network}`,
            });
          } catch (e) {
            saveStakingSession({
              nextStep: StakingStep.NotarizeAAvaxB,
              transactionHash,
              from: address,
              network: `${payload.network}`,
              error: e.message || e.stack,
            });

            throw e;
          }
        })(),
      },
      meta: {
        asMutation: true,
      },
    }),
  ),
  withdrawAAvaxB: createAction(
    'WITHDRAW_AAVAXB',
    (): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();
          const web3 = stkrSdk.getKeyProvider().getWeb3();

          const session = getStakingSession();

          if (
            !session ||
            !session.transactionHash ||
            !session.amount ||
            !session.signature ||
            !session.from ||
            !session.recipient
          ) {
            throw new Error(t('stake-avax.error.transaction-info'));
          }

          const address = stkrSdk.currentAccount();
          if (address !== session.recipient) {
            throw new Error(t('stake-avax.error.to-address'));
          }

          const isToBNB = session.network === String(binanceChainId);

          const toToken = isToBNB ? `${bnbAAvaxB}` : `${ethAAvaxB}`;

          setSessionInProgress();

          const {
            receiptPromise,
            transactionHash,
          } = await stkrSdk.crossWithdrawAsync(
            avalancheAAvaxB,
            toToken,
            `${avalancheChainId}`,
            session.from,
            session.amount,
            session.transactionHash,
            session.signature,
          );

          try {
            saveStakingSession({
              ...session,
              transactionHash,
            });

            await receiptPromise;

            saveStakingSession({
              nextStep: StakingStep.DepositAvax,
              amount: session.amount,
              network: session.network,
            });
            return transactionHash;
          } catch (e) {
            return await new Promise(resolve => {
              // TODO: move to utils, or SDK
              const interval = setInterval(async () => {
                const receipt = await web3.eth.getTransactionReceipt(
                  transactionHash,
                );
                if (receipt) {
                  clearInterval(interval);
                  resolve(transactionHash);
                }
              }, 10 * 1000);
            });
          }
        })(),
      },
      meta: {
        asMutation: true,
        onError: error => {
          setSessionInProgress(false);
          throw error;
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

          setSessionInProgress();
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

          saveStakingSession({
            nextStep: StakingStep.NotarizeAvax,
            transactionHash,
            network: session.network,
          });

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

            saveStakingSession({
              nextStep: StakingStep.WithdrawAvax,
              transactionHash,
              amount,
              network: session.network,
              signature,
              recipient: address,
            });
          } catch (e) {
            saveStakingSession({
              nextStep: StakingStep.NotarizeAvax,
              transactionHash,
              error: e.message || e.stack,
              network: session.network,
            });

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
          setSessionInProgress();
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
          saveStakingSession({
            nextStep: StakingStep.ClaimAvax,
            amount: session.amount,
          });
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
          setSessionInProgress();
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
  fetchEstimatedAPY: createAction<RequestAction>('FETCH_ESTIMATED_APY', () => ({
    request: {
      url: `/v1alpha/avax/estimatedapy`,
      method: 'get',
    },
    meta: {
      driver: 'axios',
      asMutation: false,
      getData: data => new BigNumber(data.apy.slice(0, -1)),
    },
  })),
};

import { RequestAction } from '@redux-requests/core';
import BigNumber from 'bignumber.js';
import { createAction } from 'redux-smart-actions';
import { Blockchain } from '../../common/types';
import { StkrSdk } from '../../modules/api';
import { configFromEnv } from '../../modules/api/config';
import { CrossChainSdk } from '../../modules/cross-chain-sdk';
import { UserActions } from './UserActions';
import { IStakingEntry } from '../../modules/avalanche-sdk/types';

const TOKEN_GOERLI = '0x63dC5749fa134fF3B752813388a7215460a8aB01';
const TOKEN_SMART_CHAIN_TESTNET = '0x81f151c7104AC815e5F66bAAae91b0F85634Bb04';

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const IS_TEST_MODE = false;
const DELAY = 2 * 1000;

const {
  contractConfig,
  binanceConfig,
  providerConfig: { ethereumChainId, binanceChainId },
} = configFromEnv();

const ethereumAETHContract = contractConfig.aethContract || TOKEN_GOERLI;
const binanceAETHContract =
  binanceConfig?.aethContract || TOKEN_SMART_CHAIN_TESTNET;

export interface IDeposit {
  txHash: string;
  fromAddress: string;
  toAddress: string;
  amount: BigNumber;
  fromBlockchain: Blockchain;
  toBlockchain: Blockchain;
}

export interface ISign {
  signature: string;
}

export interface IWithdraw {
  resultTx: string;
}

export const BridgeActions = {
  deposit: createAction(
    'DEPOSIT',
    ({
      fromAddress,
      toAddress,
      amount,
      fromBlockchain,
      toBlockchain,
    }: {
      fromAddress: string;
      toAddress: string;
      amount: BigNumber;
      fromBlockchain: Blockchain;
      toBlockchain: Blockchain;
    }): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();
          const crossChainSdk = await CrossChainSdk.fromConfigFile(
            stkrSdk.getKeyProvider().getWeb3(),
          );

          const isFromEthereum = fromBlockchain === Blockchain.ethereum;

          const fromToken = isFromEthereum
            ? ethereumAETHContract
            : binanceAETHContract;
          const toToken = isFromEthereum
            ? binanceAETHContract
            : ethereumAETHContract;
          const toChain = isFromEthereum
            ? `${binanceChainId}`
            : `${ethereumChainId}`;

          let result;
          if (IS_TEST_MODE) {
            await delay(DELAY);
            result = {
              transactionHash: 'test',
            };
          } else {
            result = await crossChainSdk.deposit(
              fromToken,
              toToken,
              toChain,
              toAddress,
              amount,
            );
          }

          return {
            txHash: result.transactionHash,
            fromAddress,
            toAddress,
            amount,
            fromBlockchain,
            toBlockchain,
          } as IDeposit;
        })(),
      },
      meta: {
        onSuccess: (response, _action, store) => {
          store.dispatch(UserActions.fetchStakerStats());
          return response;
        },
      },
    }),
  ),

  sign: createAction(
    'SIGN',
    (txHash: string): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();
          const crossChainSdk = await CrossChainSdk.fromConfigFile(
            stkrSdk.getKeyProvider().getWeb3(),
          );

          let signature;
          if (IS_TEST_MODE) {
            await delay(DELAY);
            signature = 'test';
          } else {
            signature = await crossChainSdk.notarize(txHash);
          }

          return {
            signature,
          } as ISign;
        })(),
      },
    }),
  ),

  withdraw: createAction(
    'WITHDRAW',
    ({
      txHash,
      signature,
      fromAddress,
      amount,
      to,
    }: {
      txHash: string;
      signature: string;
      fromAddress: string;
      amount: string;
      to: Blockchain;
    }): RequestAction => ({
      request: {
        promise: (async () => {
          const stkrSdk = StkrSdk.getForEnv();
          const crossChainSdk = await CrossChainSdk.fromConfigFile(
            stkrSdk.getKeyProvider().getWeb3(),
          );

          const isToBinance = to === Blockchain.binance;

          const fromToken = isToBinance
            ? ethereumAETHContract
            : binanceAETHContract;
          const toToken = isToBinance
            ? binanceAETHContract
            : ethereumAETHContract;
          const fromChain = isToBinance
            ? `${ethereumChainId}`
            : `${binanceChainId}`;

          let resultTx;
          if (IS_TEST_MODE) {
            await delay(DELAY);
            resultTx = 'test';
          } else {
            resultTx = await crossChainSdk.withdraw(
              fromToken,
              toToken,
              fromChain,
              fromAddress,
              amount,
              txHash,
              signature,
            );
          }

          return {
            resultTx,
          } as IWithdraw;
        })(),
      },
    }),
  ),

  fetchStakingHistory: createAction(
    'FETCH_STAKING_HISTORY',
    (): RequestAction => ({
      request: {
        promise: (async (): Promise<IStakingEntry[]> => {
          const stkrSdk = StkrSdk.getForEnv();
          const crossChainSdk = await CrossChainSdk.fromConfigFile(
            stkrSdk.getKeyProvider().getWeb3(),
          );
          return await crossChainSdk.fetchStakeLogs();
        })(),
      },
    }),
  ),
};

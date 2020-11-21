/* eslint-disable @typescript-eslint/interface-name-prefix */
import Web3 from 'web3';
import { bytesToHex, numberToHex } from 'web3-utils';
import {
  Address,
  KeyProvider,
  ProviderMessage,
  ProviderRpcError,
  SendAsyncResult,
  SendOptions,
} from './provider';
import { Transaction } from 'ethereumjs-tx';
import { KeyProviderEvents } from './event';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { CHAINS, isMainnet } from '../../common/const';
import { PALETTE } from '../../common/themes/mainTheme';

export class MetaMaskProvider extends KeyProvider {
  private web3Modal: Web3Modal | undefined;
  private provider: any;

  async connect(): Promise<void> {
    // TODO Move up the provider creation
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: isMainnet
          ? {
              rpc: {
                1: 'https://eth-03.dccn.ankr.com', // MAINNET
                5: 'https://eth-03.dccn.ankr.com', // GOERLI
              },
            }
          : {
              infuraId: '3c88c0ec7e57421fa7d019780d2e6768',
            },
      },
    };

    this.web3Modal = new Web3Modal({
      // network: ETHEREUM_NETWORK,
      cacheProvider: false,
      providerOptions,
      theme: {
        background: PALETTE.background.paper,
        main: PALETTE.primary.main,
        secondary: PALETTE.text.primary,
        border: PALETTE.background.default,
        hover: PALETTE.background.paper,
      },
    } as any);

    const provider = await this.web3Modal.connect();
    this.provider = provider;

    const web3 = new Web3(provider);

    // TODO remove parseInt
    if (
      isMainnet &&
      CHAINS.mainnet !== parseInt(this.providerConfig.networkId, 10)
    ) {
      throw new Error('Please, switch to Mainnet network in your wallet');
    }

    if (
      !isMainnet &&
      CHAINS.goerli !== parseInt(this.providerConfig.networkId, 10)
    ) {
      throw new Error('Please, switch to Goerli network in your wallet');
    }

    if (
      provider.networkVersion &&
      this.providerConfig.networkId &&
      Number(provider.networkVersion) !== Number(this.providerConfig.networkId)
    ) {
      console.error(
        `ethereum networks mismatched ${provider.networkVersion} != ${this.providerConfig.networkId}`,
      );
      throw new Error(
        'MetaMask ethereum network mismatched, please check your MetaMask network.',
      );
    }
    await this.unlockAccounts(web3);
    provider.on('accountsChanged', (accounts: Address[]) => {
      this.eventEmitter.emit(KeyProviderEvents.AccountChanged, { accounts });
    });
    provider.on('disconnect', (error: ProviderRpcError) => {
      this.eventEmitter.emit(KeyProviderEvents.Disconnect, { error });
      console.log(
        `You've disconnected from MetaMask: ${JSON.stringify(error)}`,
      );
    });
    provider.on('message', (message: ProviderMessage) => {
      this.eventEmitter.emit(KeyProviderEvents.Message, message);
    });
    provider.on('chainChanged', (chainId: string) => {
      this.eventEmitter.emit(KeyProviderEvents.ChainChanged, {
        chainId,
      });
      console.log(`detected MetaMask chainId change to ${chainId}`);
    });
    provider.autoRefreshOnNetworkChange = false;
    this._latestBlockHeight = await web3.eth.getBlockNumber();
    this._web3 = web3;
  }

  disconnect(): Promise<void> {
    if (this.provider?.close instanceof Function) {
      this.provider.close();
      this.web3Modal?.clearCachedProvider()
    }
    return Promise.resolve();
  }

  async findAccounts(): Promise<string[]> {
    return this._currentAccount ? [this._currentAccount] : [];
  }

  async sign(data: Buffer | string | object, address: string): Promise<string> {
    try {
      if (typeof data === 'object') {
        // @ts-ignore
        data = bytesToHex(data as any);
      }
      return this.getWeb3().eth.personal.sign(data, address, '');
    } catch (e) {
      console.error(e);
      const message = e.message.substr(0, e.message.indexOf('\n')),
        parts = message.split(':');
      /* try to detect angry MetaMask messages */
      if (parts.length > 0) {
        /* special case for Firefox that doesn't return any errors, only extension stack trace */
        if (
          message.includes('@moz-extension') &&
          message.includes('Returned error: value')
        ) {
          throw new Error('User denied message signature');
        }
        /* cases for other browsers (tested in Chrome, Opera, Brave) */
        if (
          message.includes('MetaMask') ||
          message.includes('Returned error') ||
          message.includes('RPC Error')
        ) {
          throw new Error(parts[parts.length - 1]);
        }
      }
      throw e;
    }
  }

  public async sendAsync(
    from: string,
    to: string,
    sendOptions: SendOptions,
  ): Promise<SendAsyncResult> {
    const gasPrice = await this.getWeb3().eth.getGasPrice();
    console.log('Gas Price: ' + gasPrice);
    const nonce = await this.getWeb3().eth.getTransactionCount(from);
    console.log('Nonce: ' + nonce);
    const tx = {
      from: from,
      to: to,
      value: numberToHex(sendOptions.value || '0'),
      gas: numberToHex(sendOptions.gasLimit || '200000'),
      gasPrice: gasPrice,
      data: sendOptions.data,
      nonce: nonce,
      chainId: Number(this.providerConfig.chainId),
    };
    console.log('Sending transaction via Web3: ', tx);
    return new Promise<SendAsyncResult>((resolve, reject) => {
      const promise = this.getWeb3().eth.sendTransaction(tx);
      promise
        .once('transactionHash', async (transactionHash: string) => {
          console.log(`Just signed transaction has is: ${transactionHash}`);
          const rawTx = await this.getWeb3().eth.getTransaction(
            transactionHash,
          );
          console.log(
            `Found transaction in node: `,
            JSON.stringify(rawTx, null, 2),
          );
          // @ts-ignore
          const { v, r, s } = rawTx; /* this fields are not-documented */
          const newTx = new Transaction(
            {
              gasLimit: this.getWeb3().utils.numberToHex(rawTx.gas),
              gasPrice: this.getWeb3().utils.numberToHex(
                Number(rawTx.gasPrice),
              ),
              to: `${rawTx.to}`,
              nonce: this.getWeb3().utils.numberToHex(rawTx.nonce),
              data: rawTx.input,
              v: v,
              r: r,
              s: s,
              value: this.getWeb3().utils.numberToHex(rawTx.value),
            },
            {
              chain: Number(this.providerConfig.chainId),
            },
          );
          if (!newTx.verifySignature())
            throw new Error(`The signature is not valid for this transaction`);
          console.log(`New Tx: `, JSON.stringify(newTx, null, 2));
          const rawTxHex = newTx.serialize().toString('hex');
          console.log(`Raw transaction hex is: `, rawTxHex);
          resolve({
            receiptPromise: promise,
            transactionHash: transactionHash,
            rawTransaction: rawTxHex,
          });
        })
        .catch(reject);
    });
  }

  private async unlockAccounts(web3: Web3): Promise<string[]> {
    let unlockedAccounts: string[] = [];
    try {
      unlockedAccounts = await web3.eth.getAccounts();
    } catch (error) {
      console.error(error);
      throw new Error('User denied access to account');
    }
    console.log(`unlocked metamask accounts: ${unlockedAccounts}`);
    if (!unlockedAccounts.length || !unlockedAccounts[0]) {
      throw new Error('Unable to detect unlocked MetaMask account');
    }
    this._currentAccount = unlockedAccounts[0];
    console.log(`current account is ${this._currentAccount}`);
    return unlockedAccounts;
  }
}

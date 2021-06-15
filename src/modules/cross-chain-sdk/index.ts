import BigNumber from 'bignumber.js';
import { EventEmitter } from 'events';
import { EventLog } from 'web3-core';
import { Transaction } from 'ethereumjs-tx';
import { Contract } from 'web3-eth-contract';
import { StkrSdk } from '../api';
import { ISendAsyncResult, KeyProvider, SendOptions } from '../api/provider';
import ABI_CROSS_CHAIN_BRIDGE from './abi/CrossChainBridge.json';
import DEFAULT_CONFIG from './addresses.json';
import { AVAILABLE_NETWORKS, INetworkEntity } from './network';
import { CrossChainEvent } from './events';

export interface IBridgeEntity {
  bridgeStatus: 'Disabled' | 'Enabled';
  bridgeType: 'Mintable' | 'Lockable';
  fromChain: string;
  toChain: string;
  fromToken: string;
  toToken: string;
}

const mapBridgeToEntityUnsafe = (value: any): IBridgeEntity => {
  let bridgeStatus: string,
    bridgeType: string,
    fromToken,
    toToken,
    fromChain,
    toChain;
  if (typeof value === 'object') {
    bridgeStatus = value['0'];
    bridgeType = value['1'];
    fromToken = value['2'];
    toToken = value['3'];
    fromChain = value['4'];
    toChain = value['5'];
  } else if (Array.isArray(value)) {
    bridgeStatus = value[0];
    bridgeType = value[1];
    fromToken = value[2];
    toToken = value[3];
    fromChain = value[4];
    toChain = value[5];
  } else {
    throw new Error(`Unknown bridge type: ${value}`);
  }
  const mapStatus = () => {
    if (bridgeStatus === '0') {
      return 'Disabled';
    } else if (bridgeStatus === '1') {
      return 'Enabled';
    }
    throw new Error(`Unknown bridge status: ${bridgeStatus}`);
  };
  const mapType = () => {
    if (bridgeType === '0') {
      return 'Mintable';
    } else if (bridgeType === '1') {
      return 'Lockable';
    }
    throw new Error(`Unknown bridge type: ${bridgeType}`);
  };
  return {
    bridgeStatus: mapStatus(),
    bridgeType: mapType(),
    fromChain: fromChain,
    toChain: toChain,
    fromToken: fromToken,
    toToken: toToken,
  };
};

export class CrossChainSdk {
  private readonly currentNetwork: INetworkEntity;
  private readonly supportedChains: Set<string> = new Set<string>();
  private readonly currentContractAddress: string;
  private readonly currentContract: Contract;

  private depositSubscription: any;
  private withdrawSubscription: any;

  private constructor(
    private readonly keyProvider: KeyProvider,
    configMap: Record<
      string,
      Record<
        string,
        {
          CrossChainBridge: string;
          Migrations: string;
        }
      >
    >,
    chainId: number | string,
    protected eventEmitter: EventEmitter,
  ) {
    const contractMap: Record<string, Contract> = {};
    let currentContract: Contract | undefined = undefined,
      currentContractAddress: string | undefined = undefined;
    const env = process.env.REACT_APP_STKR_ENV
      ? process.env.REACT_APP_STKR_ENV
      : 'develop';
    const bridgesMap = configMap[env];
    for (const [key, value] of Object.entries(bridgesMap)) {
      const web3 = this.keyProvider.getWeb3();
      const contract = new web3.eth.Contract(
        ABI_CROSS_CHAIN_BRIDGE as any,
        value.CrossChainBridge,
      );
      if (String(chainId) === key) {
        currentContract = contract;
        currentContractAddress = value.CrossChainBridge;
      }
      contractMap[key] = contract;
    }
    if (!currentContract || !currentContractAddress) {
      throw new Error(`CrossChain is not supported by current chain`);
    }
    this.currentContractAddress = currentContractAddress;
    this.currentContract = currentContract;
    Object.keys(configMap).forEach(v => this.supportedChains.add(v));
    this.currentNetwork = CrossChainSdk.findNetworkForChain(chainId);
  }

  public static findNetworkForChain(chainId: number | string): INetworkEntity {
    const [network] = Object.values(AVAILABLE_NETWORKS).filter(
      n => n.chainId === `${chainId}`,
    );
    if (!network) {
      throw new Error(`Unable to resolve current network for chain ${chainId}`);
    }
    return network;
  }

  public static async fromConfigFile(
    keyProvider: KeyProvider,
    eventEmitter: EventEmitter,
  ): Promise<CrossChainSdk> {
    return CrossChainSdk.fromConfigMap(
      keyProvider,
      DEFAULT_CONFIG as any,
      eventEmitter,
    );
  }

  public static async fromConfigMap(
    keyProvider: KeyProvider,
    configMap: Record<
      string,
      Record<
        string,
        {
          CrossChainBridge: string;
          Migrations: string;
        }
      >
    >,
    eventEmitter: EventEmitter,
  ): Promise<CrossChainSdk> {
    const web3 = keyProvider.getWeb3();
    const chainId = await web3.eth.getChainId();
    return new CrossChainSdk(keyProvider, configMap, chainId, eventEmitter);
  }

  public getCurrentNetwork(): INetworkEntity {
    return this.currentNetwork;
  }

  public getAvailableNetworks(): INetworkEntity[] {
    return Object.values(AVAILABLE_NETWORKS)
      .filter(network => this.supportedChains.has(network.chainId))
      .filter(network => network.type === this.currentNetwork.type);
  }

  public getTargetNetworks(): INetworkEntity[] {
    return this.getAvailableNetworks().filter(
      network => network.chainId !== this.currentNetwork.chainId,
    );
  }

  public async getAllBridges(): Promise<IBridgeEntity[]> {
    const bridges = await this.currentContract.methods.getAllBridges().call();
    /* first element is zero element */
    return bridges
      .slice(1)
      .map((v: any) => {
        try {
          return mapBridgeToEntityUnsafe(v);
        } catch (e) {
          console.error(`Failed to map bridge due to error: ${e}`);
        }
        return null;
      })
      .filter((v: any) => v);
  }

  public async deposit(
    fromToken: string,
    toToken: string,
    toChain: string,
    toAddress: string | null,
    depositAmount: BigNumber,
  ): Promise<any> {
    const scaledNumber = depositAmount.multipliedBy(1e18).toString(10);
    const web3 = this.keyProvider.getWeb3();
    const [currentAccount] = await web3.eth.getAccounts();
    if (toAddress === null) {
      toAddress = currentAccount;
    }
    const fromChain = this.currentNetwork.chainId;
    const rawBridge = await this.currentContract.methods
      .getBridgeBySourceAndTarget(fromToken, toToken, fromChain, toChain)
      .call();
    mapBridgeToEntityUnsafe(rawBridge['0']);
    return this.currentContract.methods
      .deposit(
        // token
        fromToken,
        toToken,
        // chain
        web3.utils.numberToHex(toChain),
        // address
        toAddress,
        // amount
        web3.utils.numberToHex(scaledNumber),
      )
      .send({ from: currentAccount });
  }

  /**
   * @deprecated use {StkrSdk#notarizeTransfer} instead
   */
  public async notarize(tx: string): Promise<string> {
    const fromChain = this.currentNetwork.tag;
    const stkrSdk = StkrSdk.getForEnv();
    const result = await stkrSdk.notarizeTransfer(fromChain, tx);
    return result.signature;
  }

  public async withdraw(
    fromToken: string,
    toToken: string,
    fromChain: string,
    fromAddress: string | null,
    withdrawAmount: string,
    txHash: string,
    signature: string,
    scale = true,
  ): Promise<any> {
    let scaledNumber;
    if (scale) {
      const amount = new BigNumber(withdrawAmount).multipliedBy(1e18);
      scaledNumber = amount.toString(10);
    } else {
      scaledNumber = withdrawAmount;
    }

    const web3 = this.keyProvider.getWeb3();
    const [currentAccount] = await web3.eth.getAccounts();
    if (fromAddress === null) {
      fromAddress = currentAccount;
    }
    return this.currentContract.methods
      .withdraw(
        // token
        fromToken,
        toToken,
        // chain
        web3.utils.numberToHex(fromChain),
        // address
        fromAddress,
        // amount
        web3.utils.numberToHex(scaledNumber),
        // transaction hash with signature
        txHash,
        signature,
      )
      .send({ from: currentAccount });
  }

  public async withdrawAsync(
    fromToken: string,
    toToken: string,
    fromChain: string,
    fromAddress: string | null,
    withdrawAmount: string,
    txHash: string,
    signature: string,
  ): Promise<any> {
    const web3 = this.keyProvider.getWeb3();
    const [currentAccount] = await web3.eth.getAccounts();
    if (fromAddress === null) {
      fromAddress = currentAccount;
    }

    const data: string = this.currentContract.methods
      .withdraw(
        // token
        fromToken,
        toToken,
        // chain
        web3.utils.numberToHex(fromChain),
        // address
        fromAddress,
        // amount
        web3.utils.numberToHex(withdrawAmount),
        // transaction hash with signature
        txHash,
        signature,
      )
      .encodeABI();

    return this.sendAsync(
      currentAccount,
      this.currentContractAddress,
      {
        data: data,
      },
      fromChain,
    );
    // .send({ from: currentAccount });
  }

  public async dispose() {
    this.depositSubscription?.unsubscribe();
    this.withdrawSubscription?.unsubscribe();
  }

  public async listen() {
    const currentAddress = this.keyProvider.currentAccount(),
      latestBlockHeight = this.keyProvider.latestBlockHeight();

    // this.depositSubscription = this.currentContract.events
    //   .CrossChainDeposit({
    //     filter: { fromAddress: currentAddress },
    //     fromBlock: latestBlockHeight,
    //   })
    //   .on('data', (eventLog: EventLog) => {
    //     console.dir({ eventLog });
    //   });

    this.withdrawSubscription = this.currentContract.events
      .CrossChainWithdraw({
        filter: { fromAddress: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { depositTxHash } = eventLog.returnValues;
        this.eventEmitter.emit(CrossChainEvent.aAVAXbClaimFinished, {
          depositTxHash,
        });
      });
  }

  private async sendAsync(
    from: string,
    to: string,
    sendOptions: SendOptions,
    chainId: string,
  ): Promise<ISendAsyncResult> {
    const web3 = this.keyProvider.getWeb3();
    const gasPrice = await web3.eth.getGasPrice();
    console.log('Gas Price: ' + gasPrice);
    const nonce = await web3.eth.getTransactionCount(from);
    console.log('Nonce: ' + nonce);
    const tx = {
      from: from,
      to: to,
      value: web3.utils.numberToHex(sendOptions.value || '0'),
      gas: web3.utils.numberToHex(sendOptions.gasLimit || '500000'),
      gasPrice: gasPrice,
      data: sendOptions.data,
      nonce: nonce,
      chainId: +chainId,
    };
    console.log('Sending transaction via Web3: ', tx);
    return new Promise<ISendAsyncResult>((resolve, reject) => {
      const promise = web3.eth.sendTransaction(tx);
      promise
        .once('transactionHash', async (transactionHash: string) => {
          console.log(`Just signed transaction has is: ${transactionHash}`);
          const rawTx = await web3.eth.getTransaction(transactionHash);
          console.log(
            `Found transaction in node: `,
            JSON.stringify(rawTx, null, 2),
          );
          const rawTxHex = this.tryGetRawTx(rawTx, chainId);
          resolve({
            receiptPromise: promise,
            transactionHash: transactionHash,
            rawTransaction: rawTxHex,
          });
        })
        .catch(reject);
    });
  }

  private tryGetRawTx(rawTx: any, chainId: string): string {
    const allowedChains = ['1', '3', '4', '42', '5'];
    if (!allowedChains.includes(`${chainId}`)) {
      console.warn(`raw tx can't be greated for this chain id ${chainId}`);
      return '';
    }
    const { v, r, s } = rawTx as any; /* this fields are not-documented */
    const web3 = this.keyProvider.getWeb3();
    const newTx = new Transaction(
      {
        gasLimit: web3.utils.numberToHex(rawTx.gas),
        gasPrice: web3.utils.numberToHex(Number(rawTx.gasPrice)),
        to: `${rawTx.to}`,
        nonce: web3.utils.numberToHex(rawTx.nonce),
        data: rawTx.input,
        v: v,
        r: r,
        s: s,
        value: web3.utils.numberToHex(rawTx.value),
      },
      {
        chain: chainId,
      },
    );
    if (!newTx.verifySignature())
      throw new Error(`The signature is not valid for this transaction`);
    console.log(`New Tx: `, JSON.stringify(newTx, null, 2));
    const rawTxHex = newTx.serialize().toString('hex');
    console.log(`Raw transaction hex is: `, rawTxHex);
    return rawTxHex;
  }
}

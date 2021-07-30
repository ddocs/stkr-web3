import BigNumber from 'bignumber.js';
import Web3 from 'web3';
import { Contract, EventData } from 'web3-eth-contract';
import { BlockchainNetworkId } from '../../common/types';
import { singleton } from '../../common/utils/Singleton';
import { Address } from '../api/provider';
import ABI_CROSS_CHAIN_BRIDGE from '../cross-chain-sdk/abi/CrossChainBridge.json';
import DEFAULT_CONFIG from './addresses.json';

declare module 'web3-eth-contract' {
  interface EventData {
    removed: boolean;
  }
}

interface IApiTransfer {
  bridgeIndex: '1';
  fromAddress: Address;
  fromChain: string;
  fromToken: Address;
  toAddress: Address;
  toChain: string;
  toToken: Address;
}

interface IApiDeposit extends IApiTransfer {
  depositAmount: string;
}

interface IApiWithdraw extends IApiTransfer {
  withdrawAmount: string;
  depositTxHash: string;
}

interface ITransfer {
  fromAddress: Address;
  fromChain: BlockchainNetworkId;
  fromToken: Address;
  toAddress: Address;
  toChain: BlockchainNetworkId;
  toToken: Address;
}

interface IDeposit extends ITransfer {
  depositAmount: BigNumber;
  txHash: string;
}

interface IWithdrawal extends ITransfer {
  withdrawAmount: BigNumber;
  signature: string;
  transactionHash: string;
  depositTxHash: string;
}

const BATCH_SIZE = 2;
const BLOCKS_DEEP = 1990;
const BLOCKS_DEEP_AVALANCHE = BLOCKS_DEEP * BATCH_SIZE;

enum Event {
  CrossChainWithdraw = 'CrossChainWithdraw',
  CrossChainDeposit = 'CrossChainDeposit',
}

@singleton
export class AvalancheEventsHistory {
  private web3Etherium: Web3;
  private web3Smartchain: Web3;
  private web3Avalanche: Web3;
  private crossChainBridgeEthereum: Contract;
  private crossChainBridgeSmartchain: Contract;
  private crossChainBridgeAvalanche: Contract;

  private getConfiguration() {
    if (this.avalancheChainId === BlockchainNetworkId.avalanche) {
      return {
        ethereumHttpProviderUrl:
          'https://apis.ankr.com/dcb231f2a7884aa29d4f93071359ccaa/fabcaa58c11a8dac4b7de405f793bb65/eth/fast/main',
        smartchainHttpProviderUrl:
          'https://apis.ankr.com/5e432c1de2c94f6d8d4a4b53d0d64be0/fabcaa58c11a8dac4b7de405f793bb65/binance/full/main',
        avalancheHttpProviderUrl:
          'https://apis.ankr.com/d4a3e562560843118c890218b8c13a0f/fabcaa58c11a8dac4b7de405f793bb65/avax/archive/main/ext/bc/C/rpc',
        ethereumCrossChainBridge: DEFAULT_CONFIG.mainnet['1'].CrossChainBridge,
        smartchainCrossChainBridge:
          DEFAULT_CONFIG.mainnet['56'].CrossChainBridge,
        avalancheCrossChainBridge:
          DEFAULT_CONFIG.mainnet['43114'].CrossChainBridge,
      };
    } else {
      return {
        ethereumHttpProviderUrl:
          'https://apis.ankr.com/febd3f2636cc4a779c4cc92bb9d65be1/fabcaa58c11a8dac4b7de405f793bb65/eth/fast/goerli',
        smartchainHttpProviderUrl:
          'https://apis.ankr.com/6a61850e23634cd4bf2255e1c17385d6/fabcaa58c11a8dac4b7de405f793bb65/binance/full/test',
        avalancheHttpProviderUrl:
          'https://avax-fujitestnet-01.dccn.ankr.com/ext/bc/C/rpc',
        ethereumCrossChainBridge: DEFAULT_CONFIG.goerli['5'].CrossChainBridge,
        smartchainCrossChainBridge:
          DEFAULT_CONFIG.goerli['97'].CrossChainBridge,
        avalancheCrossChainBridge:
          DEFAULT_CONFIG.goerli['43113'].CrossChainBridge,
      };
    }
  }

  constructor(private avalancheChainId: BlockchainNetworkId) {
    const {
      ethereumHttpProviderUrl,
      smartchainHttpProviderUrl,
      avalancheHttpProviderUrl,
      ethereumCrossChainBridge,
      smartchainCrossChainBridge,
      avalancheCrossChainBridge,
    } = this.getConfiguration();

    this.web3Etherium = new Web3();
    this.web3Etherium.setProvider(
      new Web3.providers.HttpProvider(ethereumHttpProviderUrl),
    );
    this.crossChainBridgeEthereum = new this.web3Etherium.eth.Contract(
      ABI_CROSS_CHAIN_BRIDGE as any,
      ethereumCrossChainBridge,
    );

    this.web3Smartchain = new Web3();
    this.web3Smartchain.setProvider(
      new Web3.providers.HttpProvider(smartchainHttpProviderUrl),
    );
    this.crossChainBridgeSmartchain = new this.web3Smartchain.eth.Contract(
      ABI_CROSS_CHAIN_BRIDGE as any,
      smartchainCrossChainBridge,
    );

    this.web3Avalanche = new Web3();
    this.web3Avalanche.setProvider(
      new Web3.providers.HttpProvider(avalancheHttpProviderUrl),
    );
    this.crossChainBridgeAvalanche = new this.web3Avalanche.eth.Contract(
      ABI_CROSS_CHAIN_BRIDGE as any,
      avalancheCrossChainBridge,
    );
  }

  private async getEthereumEvents(address: Address) {
    return getWithdrawPastEvents({
      address,
      contract: this.crossChainBridgeEthereum,
      provider: this.web3Etherium,
    });
  }

  private async getSmartchainEvents(address: Address) {
    return getWithdrawPastEvents({
      address,
      contract: this.crossChainBridgeSmartchain,
      provider: this.web3Smartchain,
    });
  }

  private async getAvalancheEvents(address: Address) {
    const contract = this.crossChainBridgeAvalanche;
    const provider = this.web3Avalanche;

    return contract
      .getPastEvents(Event.CrossChainDeposit, {
        fromBlock:
          (await provider.eth.getBlockNumber()) - BLOCKS_DEEP_AVALANCHE,
        filter: {
          // TODO Indexing https://ankrnetwork.atlassian.net/browse/STAKAN-92
        },
      })
      .then(data => {
        return data
          .filter(
            item => !item.removed && item.returnValues.fromAddress === address,
          )
          .map(item => {
            return mapDeposit(item.returnValues as IApiDeposit, item);
          });
      });
  }

  private async getEvents(address: Address, networkId: BlockchainNetworkId) {
    if (
      networkId === BlockchainNetworkId.avalanche ||
      networkId === BlockchainNetworkId.avalancheTestnet
    ) {
      const avalancheEvents = await this.getAvalancheEvents(address);

      const toEthereumAddresses = unique(
        avalancheEvents
          .filter(item => {
            return (
              item.toChain === BlockchainNetworkId.mainnet ||
              item.toChain === BlockchainNetworkId.goerli
            );
          })
          .map(item => item.toAddress),
      );
      const toSmartchainAddresses = unique(
        avalancheEvents
          .filter(item => {
            return (
              item.toChain === BlockchainNetworkId.smartchain ||
              item.toChain === BlockchainNetworkId.smartchainTestnet
            );
          })
          .map(item => item.toAddress),
      );

      const [ethereumEvents, smartchainEvents] = await Promise.all([
        (
          await Promise.all(
            toEthereumAddresses.map(address => this.getEthereumEvents(address)),
          )
        ).reduce((acc, curr) => [...acc, ...curr], []),
        (
          await Promise.all(
            toSmartchainAddresses.map(address =>
              this.getSmartchainEvents(address),
            ),
          )
        ).reduce((acc, curr) => [...acc, ...curr], []),
      ]);

      return {
        ethereum: ethereumEvents,
        avalanche: avalancheEvents,
        smartchain: smartchainEvents,
      };
    }

    return {
      ethereum: [],
      avalanche: [],
      smartchain: [],
    };
  }

  async getUncompletedTransactions(
    address: Address,
    networkId: BlockchainNetworkId,
  ) {
    const { ethereum, avalanche, smartchain } = await this.getEvents(
      address,
      networkId,
    );

    const withdrawal = [...ethereum, ...smartchain];

    return avalanche.filter(depositItem => {
      return !withdrawal.find(withdrawalItem => {
        return (
          withdrawalItem.depositTxHash === depositItem.txHash &&
          withdrawalItem.fromChain === depositItem.fromChain &&
          withdrawalItem.toChain === depositItem.toChain &&
          withdrawalItem.toAddress === depositItem.toAddress &&
          withdrawalItem.fromChain === depositItem.fromChain
        );
      });
    });
  }
}

async function getWithdrawPastEvents({
  address,
  contract,
  provider,
}: {
  address: Address;
  contract: Contract;
  provider: Web3;
}) {
  const blockNumber = await provider.eth.getBlockNumber();

  const pastEventsBatch = Array(BATCH_SIZE)
    .fill(0)
    .map((_, i) =>
      contract.getPastEvents(Event.CrossChainWithdraw, {
        fromBlock: blockNumber - BLOCKS_DEEP * (i + 1),
        toBlock: i ? blockNumber - BLOCKS_DEEP * i : undefined,
        filter: {
          // TODO Indexing https://ankrnetwork.atlassian.net/browse/STAKAN-92
        },
      }),
    );

  const data = await Promise.all(pastEventsBatch);

  const events = data.reduce((acc, pastEvents) => [...acc, ...pastEvents]);

  return events
    .filter(item => !item.removed && item.returnValues.toAddress === address)
    .map(item => 
      mapWithdrawal(item.returnValues as IApiWithdraw, item);
    );
}

function mapTransfer(data: IApiTransfer): ITransfer {
  return {
    fromAddress: data.fromAddress,
    fromChain: parseInt(data.fromChain, 10),
    fromToken: data.fromToken,
    toAddress: data.toAddress,
    toChain: parseInt(data.toChain, 10),
    toToken: data.toToken,
  };
}

function mapDeposit(data: IApiDeposit, transaction: EventData): IDeposit {
  return {
    txHash: transaction.transactionHash,
    depositAmountRaw: data.depositAmount,
    depositAmount: new BigNumber(Web3.utils.fromWei(data.depositAmount)),
    ...mapTransfer(data),
  } as any;
}

function mapWithdrawal(
  data: IApiWithdraw,
  transaction: EventData,
): IWithdrawal {
  return {
    depositTxHash: data.depositTxHash,
    withdrawAmountRaw: data.withdrawAmount,
    withdrawAmount: new BigNumber(Web3.utils.fromWei(data.withdrawAmount)),
    signature: transaction.signature,
    transactionHash: transaction.transactionHash,
    ...mapTransfer(data),
  } as any;
}

function unique(arr: any[]) {
  return Array.from(new Set(arr));
}

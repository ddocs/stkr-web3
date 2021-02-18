import {
  ContractManagerEvents,
  IProviderToppedUpAnkrEvent,
  IProviderToppedUpEthEvent,
  IStakeConfirmedEvent,
  IStakePendingEvent,
  IStakeRemovedEvent,
} from './event';
import { ISendAsyncResult, KeyProvider } from './provider';
import BigNumber from 'bignumber.js';
import { Contract } from 'web3-eth-contract';
import { EventLog } from 'web3-core';
import { BlockHeader } from 'web3-eth';
import { EventEmitter } from 'events';
import ABI_GLOBAL_POOL from './contract/GlobalPool.json';
import ABI_BINANCE_GLOBAL_POOL from './contract/BinanceGlobalPool.json';
import ABI_AETH from './contract/AETH.json';
import ABI_ANKR from './contract/ANKR.json';
import ABI_SYSTEM from './contract/SystemParameters.json';
import ABI_IERC20 from './contract/IERC20.json';

export interface IContractConfig {
  aethContract?: string;
  microPoolContract: string;
  microPoolBlock: string;
  ankrContract?: string;
  stakingContract?: string;
  systemContract?: string;
}

export interface IBinanceConfig {
  globalPoolContract: string;
  globalPoolBlock: string;
  pegEthContract: string;
}

export interface IContractManager {
  connect(): Promise<void>;

  stakePendingEventLogs(): Promise<IStakePendingEvent[]>;

  stakeConfirmedEventLogs(): Promise<IStakeConfirmedEvent[]>;

  stakeRemovedEventLogs(): Promise<IStakeRemovedEvent[]>;

  providerToppedUpEthEventLogs(): Promise<IProviderToppedUpEthEvent[]>;

  providerToppedUpAnkrEventLogs(): Promise<IProviderToppedUpAnkrEvent[]>;

  stake(amount: BigNumber | BigNumber.Value): Promise<ISendAsyncResult>;

  unstake(): Promise<ISendAsyncResult>;

  topUpETH(amount: BigNumber | string): Promise<ISendAsyncResult>;

  topUpANKR(amount: BigNumber | string): Promise<ISendAsyncResult>;

  providerExit(): Promise<ISendAsyncResult>;

  claim(): Promise<ISendAsyncResult>;

  claimableRewardOf(staker: string): Promise<BigNumber>;

  poolCount(): Promise<BigNumber>;

  pendingStakesOf(staker: string): Promise<BigNumber>;

  ethereumStakingAmount(): Promise<BigNumber>;

  providerMinimumStaking(): Promise<BigNumber>;

  requesterMinimumStaking(): Promise<BigNumber>;

  checkAnkrAllowance(): Promise<BigNumber>;

  approveAnkrToStakingContract(amount: BigNumber): Promise<ISendAsyncResult>;

  ankrBalanceOf(address: string): Promise<BigNumber>;

  aethBalanceOf(address: string): Promise<BigNumber>;

  pendingEtherBalanceOf(address: string): Promise<BigNumber>;

  providerLockedEtherOf(address: string): Promise<BigNumber>;

  availableEtherBalanceOf(address: string): Promise<BigNumber>;

  aethRatio(): Promise<BigNumber>;

  etherBalanceOf(address: string): Promise<BigNumber>;
}

export class EthereumContractManager implements IContractManager {
  protected readonly microPoolContract?: Contract;
  protected readonly aethContract?: Contract;
  protected readonly ankrContract?: Contract;
  protected readonly systemContract?: Contract;

  static readonly ANKR_SCALE_FACTOR = 10 ** 18;
  static readonly ETH_SCALE_FACTOR = 10 ** 18;

  constructor(
    protected eventEmitter: EventEmitter,
    protected keyProvider: KeyProvider,
    protected contractConfig: IContractConfig,
    globalPoolAbi: any = ABI_GLOBAL_POOL,
  ) {
    this.microPoolContract = this.keyProvider.createContract(
      globalPoolAbi,
      contractConfig.microPoolContract,
    );
    if (contractConfig.aethContract) {
      this.aethContract = this.keyProvider.createContract(
        ABI_AETH as any,
        contractConfig.aethContract,
      );
    }
    if (contractConfig.ankrContract) {
      this.ankrContract = this.keyProvider.createContract(
        ABI_ANKR as any,
        contractConfig.ankrContract,
      );
    }
    if (contractConfig.systemContract) {
      this.systemContract = this.keyProvider.createContract(
        ABI_SYSTEM as any,
        contractConfig.systemContract,
      );
    }
  }

  public async connect(): Promise<void> {
    console.log(`subscribing for contract events`);
    this.followEthereumEvents();
    this.followAnkrEvents();
    this.followGlobalPoolEvents();
  }

  private async queryGlobalPoolEventLogs(
    eventType: string,
    eventName: string,
    fn: (returnValues: any) => any,
  ): Promise<any[]> {
    if (!this.microPoolContract) {
      return [];
    }
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents(eventName, {
      fromBlock: this.contractConfig.microPoolBlock,
      filter: {
        staker: currentAddress,
      },
    });
    return events.map((eventLog: EventLog) => {
      const mappedValues = fn(eventLog.returnValues);
      return {
        type: eventType,
        data: { eventLog, ...mappedValues },
      };
    });
  }

  public async stakePendingEventLogs(): Promise<IStakePendingEvent[]> {
    const fn = ({ staker, amount }: any) => {
      return {
        staker: staker,
        amount: new BigNumber(amount).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
      };
    };
    return this.queryGlobalPoolEventLogs(
      ContractManagerEvents.StakePending,
      'StakePending',
      fn,
    );
  }

  public async stakeConfirmedEventLogs(): Promise<IStakeConfirmedEvent[]> {
    const fn = ({ staker, amount }: any) => {
      return {
        staker: staker,
        amount: new BigNumber(amount).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
      };
    };
    return this.queryGlobalPoolEventLogs(
      ContractManagerEvents.StakeConfirmed,
      'StakeConfirmed',
      fn,
    );
  }

  public async stakeRemovedEventLogs(): Promise<IStakeRemovedEvent[]> {
    const fn = ({ staker, amount }: any) => {
      return {
        staker: staker,
        amount: new BigNumber(amount).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
      };
    };
    return this.queryGlobalPoolEventLogs(
      ContractManagerEvents.StakeRemoved,
      'StakeRemoved',
      fn,
    );
  }

  public async providerToppedUpEthEventLogs(): Promise<
    IProviderToppedUpEthEvent[]
  > {
    const fn = ({ provider, amount }: any) => {
      return {
        provider: provider,
        amount: new BigNumber(amount).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
      };
    };
    return this.queryGlobalPoolEventLogs(
      ContractManagerEvents.ProviderToppedUpEth,
      'ProviderToppedUpEth',
      fn,
    );
  }

  public async providerToppedUpAnkrEventLogs(): Promise<
    IProviderToppedUpAnkrEvent[]
  > {
    const fn = ({ provider, amount }: any) => {
      return {
        provider: provider,
        amount: new BigNumber(amount).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
      };
    };
    return this.queryGlobalPoolEventLogs(
      ContractManagerEvents.ProviderToppedUpAnkr,
      'ProviderToppedUpAnkr',
      fn,
    );
  }

  private _ethereumBalance?: BigNumber;

  protected followEthereumEvents(): void {
    this.keyProvider
      .getWeb3()
      .eth.subscribe('newBlockHeaders')
      .on('data', async (blockHeader: BlockHeader) => {
        const currentAddress = this.keyProvider.currentAccount();
        this.keyProvider.changeLatestBlockHeight(blockHeader.number);
        const ethBalance = await this.keyProvider.getNativeBalance(
            currentAddress,
          ),
          bigBalance = new BigNumber(ethBalance);
        if (
          this._ethereumBalance &&
          bigBalance.comparedTo(this._ethereumBalance) === 0
        ) {
          return;
        }
        console.log(
          `handled ethereum balance change from ${
            this._ethereumBalance?.toString(10) || 0
          } to ${ethBalance}`,
        );
        this._ethereumBalance = bigBalance;
        this.eventEmitter.emit(ContractManagerEvents.EthereumBalanceChanged, {
          eventLog: {
            transactionHash: '',
          },
          address: currentAddress,
          balance: this._ethereumBalance,
        });
      });
  }

  protected followAnkrEvents(): void {
    if (!this.ankrContract) {
      return;
    }
    const currentAddress = this.keyProvider.currentAccount(),
      latestBlockHeight = this.keyProvider.latestBlockHeight();
    const handleBalanceChange = async (eventLog: EventLog) => {
      const { value } = eventLog.returnValues;
      console.log(
        `handled ANKR transfer from event log`,
        JSON.stringify(eventLog, null, 2),
      );
      this.eventEmitter.emit(ContractManagerEvents.AnkrBalanceChanged, {
        eventLog: eventLog,
        address: currentAddress,
        balance: new BigNumber(await this.ankrBalanceOf(currentAddress)),
        delta: new BigNumber(value)
          .multipliedBy(EthereumContractManager.ANKR_SCALE_FACTOR)
          .negated(),
      });
    };
    // noinspection TypeScriptValidateJSTypes
    this.ankrContract.events
      .Transfer({
        filter: { from: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', handleBalanceChange);
    // noinspection TypeScriptValidateJSTypes
    this.ankrContract.events
      .Transfer({
        filter: { to: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', handleBalanceChange);
  }

  protected followGlobalPoolEvents() {
    if (!this.microPoolContract) {
      throw new Error(`Global pool contract is not initialized`);
    }
    const currentAddress = this.keyProvider.currentAccount(),
      latestBlockHeight = this.keyProvider.latestBlockHeight();
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .StakePending({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled stake pending event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.StakePending, {
          eventLog: eventLog,
          staker,
          amount: new BigNumber(amount).dividedBy(
            EthereumContractManager.ETH_SCALE_FACTOR,
          ),
        } as IStakePendingEvent['data']);
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .StakeConfirmed({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled stake confirmed event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.StakeConfirmed, {
          eventLog: eventLog,
          staker,
          amount: new BigNumber(amount).dividedBy(
            EthereumContractManager.ETH_SCALE_FACTOR,
          ),
        } as IStakeConfirmedEvent['data']);
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events
      .StakeRemoved({
        filter: { staker: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', (eventLog: EventLog) => {
        const { staker, amount } = eventLog.returnValues;
        console.log(
          `handled stake removed event log: `,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.StakeRemoved, {
          eventLog: eventLog,
          staker,
          amount: new BigNumber(amount).dividedBy(
            EthereumContractManager.ETH_SCALE_FACTOR,
          ),
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.PoolOnGoing &&
      this.microPoolContract.events
        .PoolOnGoing({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { pool } = eventLog.returnValues;
          console.log(
            `handled pool ongoing event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.PoolOnGoing, {
            eventLog: eventLog,
            pool,
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.PoolCompleted &&
      this.microPoolContract.events
        .PoolCompleted({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { pool } = eventLog.returnValues;
          console.log(
            `handled pool completed event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.PoolCompleted, {
            eventLog: eventLog,
            pool,
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.ProviderSlashedAnkr &&
      this.microPoolContract.events
        .ProviderSlashedAnkr({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const {
            provider,
            ankrAmount,
            etherEquivalence,
          } = eventLog.returnValues;
          console.log(
            `handled provider slashed ankr log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.ProviderSlashedAnkr, {
            eventLog: eventLog,
            provider,
            ankrAmount: new BigNumber(ankrAmount).dividedBy(
              EthereumContractManager.ANKR_SCALE_FACTOR,
            ),
            etherEquivalence: new BigNumber(etherEquivalence).dividedBy(
              EthereumContractManager.ETH_SCALE_FACTOR,
            ),
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.ProviderSlashedEth &&
      this.microPoolContract.events
        .ProviderSlashedEth({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { provider, amount } = eventLog.returnValues;
          console.log(
            `handled provider slashed eth event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.ProviderSlashedEth, {
            eventLog: eventLog,
            provider,
            amount: new BigNumber(amount).dividedBy(
              EthereumContractManager.ETH_SCALE_FACTOR,
            ),
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.ProviderToppedUpEth &&
      this.microPoolContract.events
        .ProviderToppedUpEth({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { provider, amount } = eventLog.returnValues;
          console.log(
            `handled provider topped up eth event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.ProviderToppedUpEth, {
            eventLog: eventLog,
            provider,
            amount: new BigNumber(amount).dividedBy(
              EthereumContractManager.ETH_SCALE_FACTOR,
            ),
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.ProviderToppedUpAnkr &&
      this.microPoolContract.events
        .ProviderToppedUpAnkr({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { provider, amount } = eventLog.returnValues;
          console.log(
            `handled provider topped up ankr event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.ProviderToppedUpAnkr, {
            eventLog: eventLog,
            provider,
            amount: new BigNumber(amount).dividedBy(
              EthereumContractManager.ANKR_SCALE_FACTOR,
            ),
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.ProviderExited &&
      this.microPoolContract.events
        .ProviderExited({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { provider } = eventLog.returnValues;
          console.log(
            `handled provider exited event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.ProviderExited, {
            eventLog: eventLog,
            provider,
          });
        });
    // noinspection TypeScriptValidateJSTypes
    this.microPoolContract.events.RewardClaimed &&
      this.microPoolContract.events
        .RewardClaimed({
          filter: { staker: currentAddress },
          fromBlock: latestBlockHeight,
        })
        .on('data', (eventLog: EventLog) => {
          const { staker, amount } = eventLog.returnValues;
          console.log(
            `handled reward claimed event log: `,
            JSON.stringify(eventLog, null, 2),
          );
          this.eventEmitter.emit(ContractManagerEvents.RewardClaimed, {
            eventLog: eventLog,
            staker,
            amount: new BigNumber(amount).dividedBy(
              EthereumContractManager.ETH_SCALE_FACTOR,
            ),
          });
        });
  }

  protected checkGlobalPoolContract(): Contract {
    if (!this.microPoolContract) {
      throw new Error(`Global pool contract is not initialized`);
    }
    return this.microPoolContract;
  }

  public async stake(
    amount: BigNumber | BigNumber.Value,
  ): Promise<ISendAsyncResult> {
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods.stake().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`sending stake transaction`);
    const result = await this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data,
        value: new BigNumber(amount)
          .multipliedBy(EthereumContractManager.ETH_SCALE_FACTOR)
          .toString(10),
      },
    );
    console.log(`emitting stake manual pending event`);
    this.eventEmitter.emit(ContractManagerEvents.StakePending, {
      eventLog: {
        transactionHash: result.transactionHash,
      },
      staker: currentAccount,
      amount,
    });
    return result;
  }

  public async unstake(): Promise<ISendAsyncResult> {
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods.unstake().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    const currentStake = await this.pendingStakesOf(currentAccount);
    const result = await this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
    console.log(`emitting unstake manual pending event`);
    this.eventEmitter.emit(ContractManagerEvents.StakeRemoved, {
      eventLog: {
        transactionHash: result.transactionHash,
      },
      staker: currentAccount,
      amount: currentStake,
    });
    return result;
  }

  public async topUpETH(amount: BigNumber | string): Promise<ISendAsyncResult> {
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods.topUpETH().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
        value: new BigNumber(amount)
          .multipliedBy(EthereumContractManager.ETH_SCALE_FACTOR)
          .toString(10),
      },
    );
  }

  public async topUpANKR(
    amount: BigNumber | string,
  ): Promise<ISendAsyncResult> {
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods
      .topUpANKR(
        new BigNumber(amount)
          .multipliedBy(EthereumContractManager.ANKR_SCALE_FACTOR)
          .toString(10),
      )
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async providerExit(): Promise<ISendAsyncResult> {
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods.providerExit().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async claim(): Promise<ISendAsyncResult> {
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods.claim().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
      },
    );
  }

  public async claimableRewardOf(staker: string): Promise<BigNumber> {
    const microPoolContract = this.checkGlobalPoolContract();
    return microPoolContract.methods
      .claimableRewardOf(staker)
      .call()
      .then((value: string) => {
        return this.keyProvider.getWeb3().utils.fromWei(value);
      });
  }

  public async poolCount(): Promise<BigNumber> {
    const microPoolContract = this.checkGlobalPoolContract();
    return microPoolContract.methods.poolCount().call();
  }

  public async pendingStakesOf(staker: string): Promise<BigNumber> {
    const microPoolContract = this.checkGlobalPoolContract();
    return microPoolContract.methods
      .pendingStakesOf(staker)
      .call()
      .then((value: string) =>
        new BigNumber(value).dividedBy(
          EthereumContractManager.ETH_SCALE_FACTOR,
        ),
      );
  }

  private static readonly DEFAULT_SYSTEM_CONTRACT_PARAMETERS = {
    ethereumStakingAmount: new BigNumber('0.1'),
    providerMinimumStaking: new BigNumber('2'),
    requesterMinimumStaking: new BigNumber('0.1'),
  };

  private _systemContractParameters: any = null;

  private async systemContractParameters(): Promise<any> {
    if (this._systemContractParameters) {
      return this._systemContractParameters;
    }
    if (!this.systemContract) {
      return EthereumContractManager.DEFAULT_SYSTEM_CONTRACT_PARAMETERS;
    }
    const providerMinimumStaking = await this.systemContract.methods
      .PROVIDER_MINIMUM_STAKING()
      .call();
    const requesterMinimumStaking = await this.systemContract.methods
      .REQUESTER_MINIMUM_POOL_STAKING()
      .call();
    const ethereumStakingAmount = await this.systemContract.methods
      .ETHEREUM_STAKING_AMOUNT()
      .call();
    console.log(`fetching system contract parameters`);
    this._systemContractParameters = {
      providerMinimumStaking: new BigNumber(providerMinimumStaking).dividedBy(
        EthereumContractManager.ANKR_SCALE_FACTOR,
      ),
      requesterMinimumStaking: new BigNumber(requesterMinimumStaking).dividedBy(
        EthereumContractManager.ANKR_SCALE_FACTOR,
      ),
      ethereumStakingAmount: new BigNumber(ethereumStakingAmount).dividedBy(
        EthereumContractManager.ETH_SCALE_FACTOR,
      ),
    };
    console.log(
      `system contract parameters: ${JSON.stringify(
        this._systemContractParameters,
        null,
        2,
      )}`,
    );
    return this._systemContractParameters;
  }

  public async ethereumStakingAmount(): Promise<BigNumber> {
    const { requesterMinimumStaking } = await this.systemContractParameters();
    return requesterMinimumStaking;
  }

  public async providerMinimumStaking(): Promise<BigNumber> {
    const { providerMinimumStaking } = await this.systemContractParameters();
    return providerMinimumStaking;
  }

  public async requesterMinimumStaking(): Promise<BigNumber> {
    const { requesterMinimumStaking } = await this.systemContractParameters();
    return requesterMinimumStaking;
  }

  public async checkAnkrAllowance(): Promise<BigNumber> {
    if (!this.ankrContract || !this.contractConfig.ankrContract) {
      throw new Error('Ankr contract is not available now');
    }
    const currentAccount = await this.keyProvider.currentAccount();
    const allowance = await this.ankrContract.methods
      .allowance(currentAccount, this.contractConfig.stakingContract)
      .call();
    return new BigNumber(allowance).dividedBy(
      EthereumContractManager.ANKR_SCALE_FACTOR,
    );
  }

  public async approveAnkrToStakingContract(
    amount: BigNumber,
  ): Promise<ISendAsyncResult> {
    if (!this.ankrContract || !this.contractConfig.ankrContract) {
      throw new Error('Ankr contract is not available now');
    }
    const data: string = this.ankrContract.methods
      .approve(
        this.contractConfig.stakingContract,
        amount
          .multipliedBy(EthereumContractManager.ANKR_SCALE_FACTOR)
          .toString(10),
      )
      .encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`encoded [approveAnkrToStakingContract] ABI: ${data}`);
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.ankrContract,
      {
        data: data,
      },
    );
  }

  public async ankrBalanceOf(address: string): Promise<BigNumber> {
    if (!this.ankrContract) {
      return new BigNumber('0');
    }
    return this.keyProvider.getErc20Balance(this.ankrContract, address);
  }

  public async aethBalanceOf(address: string): Promise<BigNumber> {
    if (!this.aethContract) {
      return new BigNumber('0');
    }
    return this.keyProvider.getErc20Balance(this.aethContract, address);
  }

  public async pendingEtherBalanceOf(address: string): Promise<BigNumber> {
    const microPoolContract = this.checkGlobalPoolContract();
    const value = await microPoolContract.methods
      .pendingEtherBalanceOf(address)
      .call();
    return new BigNumber(value).dividedBy(
      EthereumContractManager.ETH_SCALE_FACTOR,
    );
  }

  public async providerLockedEtherOf(address: string): Promise<BigNumber> {
    const microPoolContract = this.checkGlobalPoolContract();
    const value = await microPoolContract.methods
      .etherBalanceOf(address)
      .call();
    return new BigNumber(value).dividedBy(
      EthereumContractManager.ETH_SCALE_FACTOR,
    );
  }

  public async availableEtherBalanceOf(address: string): Promise<BigNumber> {
    const microPoolContract = this.checkGlobalPoolContract();
    const value = await microPoolContract.methods
      .availableEtherBalanceOf(address)
      .call();
    return new BigNumber(value).dividedBy(
      EthereumContractManager.ETH_SCALE_FACTOR,
    );
  }

  public async aethRatio(): Promise<BigNumber> {
    if (!this.aethContract) {
      return new BigNumber('0');
    }
    const value = await this.aethContract.methods.ratio().call();
    return new BigNumber(value).div(EthereumContractManager.ETH_SCALE_FACTOR);
  }

  public async etherBalanceOf(address: string): Promise<BigNumber> {
    const result = await this.keyProvider.getNativeBalance(address);
    return new BigNumber(result);
  }
}

export class BinanceContractManager extends EthereumContractManager {
  protected readonly pegEthContract: Contract;

  constructor(
    protected eventEmitter: EventEmitter,
    protected keyProvider: KeyProvider,
    protected binanceConfig: IBinanceConfig,
  ) {
    super(
      eventEmitter,
      keyProvider,
      {
        microPoolContract: binanceConfig.globalPoolContract,
        microPoolBlock: binanceConfig.globalPoolBlock,
      },
      ABI_BINANCE_GLOBAL_POOL,
    );
    this.pegEthContract = this.keyProvider.createContract(
      ABI_IERC20 as any,
      binanceConfig.pegEthContract,
    );
  }

  followEthereumEvents(): void {
    const currentAddress = this.keyProvider.currentAccount(),
      latestBlockHeight = this.keyProvider.latestBlockHeight();
    const handleBalanceChange = async (eventLog: EventLog) => {
      const { value } = eventLog.returnValues;
      console.log(
        `handled Peg-ETH transfer from event log`,
        JSON.stringify(eventLog, null, 2),
      );
      this.eventEmitter.emit(ContractManagerEvents.EthereumBalanceChanged, {
        eventLog: eventLog,
        address: currentAddress,
        balance: new BigNumber(await this.etherBalanceOf(currentAddress)),
        delta: new BigNumber(value)
          .multipliedBy(EthereumContractManager.ETH_SCALE_FACTOR)
          .negated(),
      });
    };
    // noinspection TypeScriptValidateJSTypes
    this.pegEthContract.events
      .Transfer({
        filter: { from: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', handleBalanceChange);
    // noinspection TypeScriptValidateJSTypes
    this.pegEthContract.events
      .Transfer({
        filter: { to: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', handleBalanceChange);
  }

  public async stake(
    amount: BigNumber | BigNumber.Value,
  ): Promise<ISendAsyncResult> {
    amount = new BigNumber(amount);
    const currentAccount = await this.keyProvider.currentAccount();
    const allowedPegs: string = await this.pegEthContract.methods
      .allowance(currentAccount, this.binanceConfig.globalPoolContract)
      .call();
    const bigAllowance = new BigNumber(allowedPegs).dividedBy(
      EthereumContractManager.ETH_SCALE_FACTOR,
    );
    if (bigAllowance.comparedTo(amount) < 0) {
      const data: string = this.pegEthContract.methods
        .approve(
          this.binanceConfig.globalPoolContract,
          new BigNumber('1000000000000000000')
            .multipliedBy(EthereumContractManager.ETH_SCALE_FACTOR)
            .toString(10),
        )
        .encodeABI();
      const allowedResult = await this.keyProvider.sendAsync(
        currentAccount,
        this.binanceConfig.pegEthContract,
        { data: data },
      );
      console.log(`Peg-ETH spending allowed: ${allowedResult}`);
    }
    const microPoolContract = this.checkGlobalPoolContract();
    const data: string = microPoolContract.methods
      .stake(
        amount
          .multipliedBy(EthereumContractManager.ETH_SCALE_FACTOR)
          .toString(10),
      )
      .encodeABI();
    const result = await this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      { data, gasLimit: '200000' },
    );
    console.log(`emitting manual stake pending event`);
    this.eventEmitter.emit(ContractManagerEvents.StakePending, {
      eventLog: {
        transactionHash: result.transactionHash,
      },
      staker: currentAccount,
      amount,
    });
    return result;
  }

  public async providerToppedUpEthEventLogs(): Promise<
    IProviderToppedUpEthEvent[]
  > {
    return [];
  }

  public async providerToppedUpAnkrEventLogs(): Promise<
    IProviderToppedUpAnkrEvent[]
  > {
    return [];
  }

  async aethBalanceOf(address: string): Promise<BigNumber> {
    return new BigNumber('0');
  }

  async etherBalanceOf(address: string): Promise<BigNumber> {
    const result = await this.pegEthContract?.methods.balanceOf(address).call();
    return new BigNumber(result).div(EthereumContractManager.ETH_SCALE_FACTOR);
  }

  public async aethRatio(): Promise<BigNumber> {
    return new BigNumber('1');
  }
}

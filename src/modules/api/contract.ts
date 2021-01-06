import { KeyProvider, SendAsyncResult } from './provider';
import { Contract, SendOptions } from 'web3-eth-contract';
import BigNumber from 'bignumber.js';
import { EventLog } from 'web3-core';
import { EventEmitter } from 'events';
import {
  ContractManagerEvents,
  IProviderToppedUpEthEvent,
  IStakeConfirmedEvent,
  IStakePendingEvent,
  IStakeRemovedEvent,
} from './event';
import { BlockHeader } from 'web3-eth';
import { ETH_SCALE_FACTOR } from '../../common/const';
import Stkr, { GovernanceEvents } from '@ankr.com/stkr-jssdk';
import { VoteStatus } from '@ankr.com/stkr-jssdk';
import ABI_GLOBAL_POOL from './contract/GlobalPool.json';
import ABI_AETH from './contract/AETH.json';
import ABI_ANKR from './contract/ANKR.json';
import ABI_STAKING from './contract/Staking.json';
import ABI_SYSTEM from './contract/SystemParameters.json';
import * as BN from 'bn.js';

const ERROR_SDK_NOT_INITIALIZED = new Error("Stkr SDK hasn't been initialized");

export interface ContractConfig {
  aethContract: string;
  microPoolContract: string;
  microPoolBlock?: string;
  ankrContract?: string;
  stakingContract?: string;
  systemContract: string;
}

export interface SystemContractParameters {
  providerMinimumStaking: BigNumber;
  requesterMinimumStaking: BigNumber;
  ethereumStakingAmount: BigNumber;
}

const ANKR_SCALE_FACTOR = 10 ** 18;

export class ContractManager {
  private readonly microPoolContract: Contract;
  private readonly aethContract: Contract;
  private readonly ankrContract?: Contract;
  private readonly stakingContract?: Contract;
  private readonly systemContract: Contract;
  private stkr: Stkr | undefined = undefined;

  private systemContractParameters: SystemContractParameters | null = null;

  public constructor(
    private keyProvider: KeyProvider,
    private contractConfig: ContractConfig,
    private eventEmitter: EventEmitter,
  ) {
    this.microPoolContract = this.keyProvider.createContract(
      ABI_GLOBAL_POOL as any,
      contractConfig.microPoolContract,
    );
    this.aethContract = this.keyProvider.createContract(
      ABI_AETH as any,
      contractConfig.aethContract,
    );
    if (contractConfig.ankrContract) {
      this.ankrContract = this.keyProvider.createContract(
        ABI_ANKR as any,
        contractConfig.ankrContract,
      );
    }
    if (contractConfig.stakingContract) {
      this.stakingContract = this.keyProvider.createContract(
        ABI_STAKING as any,
        contractConfig.stakingContract,
      );
    }
    this.systemContract = this.keyProvider.createContract(
      ABI_SYSTEM as any,
      contractConfig.systemContract,
    );
    console.log(`subscribing for contract events`);
    this.followEthereumEvents();
    this.followAnkrEvents();
    this.followGlobalPoolEvents();

    // TODO sync init
    keyProvider
      .getWeb3()
      .eth.net.getId()
      .then(
        networkId => (this.stkr = new Stkr(keyProvider.getWeb3(), networkId)),
      );
  }

  public async queryStakePendingEventLogs(): Promise<IStakePendingEvent[]> {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents('StakePending', {
      fromBlock: this.contractConfig.microPoolBlock,
      filter: { staker: currentAddress },
    });
    return events.map((eventLog: EventLog) => {
      const { staker, amount } = eventLog.returnValues;
      return {
        type: ContractManagerEvents.StakePending,
        data: {
          eventLog,
          staker: staker,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  public async queryStakeConfirmedEventLogs(): Promise<IStakeConfirmedEvent[]> {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents(
      'StakeConfirmed',
      {
        fromBlock: this.contractConfig.microPoolBlock,
        filter: { staker: currentAddress },
      },
    );
    return events.map((eventLog: EventLog) => {
      const { staker, amount } = eventLog.returnValues;
      return {
        type: ContractManagerEvents.StakeConfirmed,
        data: {
          eventLog,
          staker: staker,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  public async queryProviderToppedUpEthEventLogs(): Promise<
    IProviderToppedUpEthEvent[]
  > {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents(
      'ProviderToppedUpEth',
      {
        filter: { provider: currentAddress },
        fromBlock: this.contractConfig.microPoolBlock,
      },
    );

    return events.map((eventLog: EventLog) => {
      const { provider, amount } = eventLog.returnValues;
      return {
        type: ContractManagerEvents.ProviderToppedUpEth,
        data: {
          eventLog,
          provider,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  public async queryStakeRemovedEventLogs(): Promise<IStakeRemovedEvent[]> {
    const currentAddress = this.keyProvider.currentAccount();
    const events = await this.microPoolContract.getPastEvents('StakeRemoved', {
      fromBlock: this.contractConfig.microPoolBlock,
      filter: { staker: currentAddress },
    });
    return events.map((eventLog: EventLog) => {
      const { staker, amount } = eventLog.returnValues;
      return {
        type: ContractManagerEvents.StakeRemoved,
        data: {
          eventLog,
          staker: staker,
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        },
      };
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private followEthereumEvents() {
    this.keyProvider
      .getWeb3()
      .eth.subscribe('newBlockHeaders')
      .on('data', async (blockHeader: BlockHeader) => {
        const currentAddress = this.keyProvider.currentAccount();
        this.keyProvider.changeLatestBlockHeight(blockHeader.number);
        const ethBalance = await this.keyProvider.ethereumBalance(
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

  private _ethereumBalance?: BigNumber;

  private followAnkrEvents() {
    const currentAddress = this.keyProvider.currentAccount(),
      latestBlockHeight = this.keyProvider.latestBlockHeight();
    // noinspection TypeScriptValidateJSTypes
    this.ankrContract?.events
      .Transfer({
        filter: { from: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', async (eventLog: EventLog) => {
        const { value } = eventLog.returnValues;
        console.log(
          `handled ANKR transfer from event log`,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.AnkrBalanceChanged, {
          eventLog: eventLog,
          address: currentAddress,
          balance: new BigNumber(await this.ankrBalance(currentAddress)),
          delta: new BigNumber(value).multipliedBy(ANKR_SCALE_FACTOR).negated(),
        });
      });
    // noinspection TypeScriptValidateJSTypes
    this.ankrContract?.events
      .Transfer({
        filter: { to: currentAddress },
        fromBlock: latestBlockHeight,
      })
      .on('data', async (eventLog: EventLog) => {
        const { value } = eventLog.returnValues;
        console.log(
          `handled ANKR transfer to event log`,
          JSON.stringify(eventLog, null, 2),
        );
        this.eventEmitter.emit(ContractManagerEvents.AnkrBalanceChanged, {
          eventLog: eventLog,
          address: currentAddress,
          balance: new BigNumber(await this.ankrBalance(currentAddress)),
          delta: new BigNumber(value).multipliedBy(ANKR_SCALE_FACTOR),
        });
      });
  }

  private followGlobalPoolEvents() {
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
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
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
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
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
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        });
      });
    // noinspection TypeScriptValidateJSTypes
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
          ankrAmount: new BigNumber(ankrAmount).dividedBy(ANKR_SCALE_FACTOR),
          etherEquivalence: new BigNumber(etherEquivalence).dividedBy(
            ETH_SCALE_FACTOR,
          ),
        });
      });
    // noinspection TypeScriptValidateJSTypes
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
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        });
      });
    // noinspection TypeScriptValidateJSTypes
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
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        });
      });
    // noinspection TypeScriptValidateJSTypes
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
          amount: new BigNumber(amount).dividedBy(ANKR_SCALE_FACTOR),
        });
      });
    // noinspection TypeScriptValidateJSTypes
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
          amount: new BigNumber(amount).dividedBy(ETH_SCALE_FACTOR),
        });
      });
  }

  public async stake(
    amount: BigNumber | BigNumber.Value,
  ): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.stake().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    console.log(`sending stake transaction`);
    const result = await this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data,
        value: new BigNumber(amount)
          .multipliedBy(ETH_SCALE_FACTOR)
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

  public async unstake(): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.unstake().encodeABI();
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

  public async topUpETH(amount: BigNumber | string): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.topUpETH().encodeABI();
    const currentAccount = await this.keyProvider.currentAccount();
    return this.keyProvider.sendAsync(
      currentAccount,
      this.contractConfig.microPoolContract,
      {
        data: data,
        value: new BigNumber(amount)
          .multipliedBy(ETH_SCALE_FACTOR)
          .toString(10),
      },
    );
  }

  public async topUpANKR(amount: BigNumber | string): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods
      .topUpANKR(
        new BigNumber(amount).multipliedBy(ANKR_SCALE_FACTOR).toString(10),
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

  public async providerExit(): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods
      .providerExit()
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

  public async claim(): Promise<SendAsyncResult> {
    const data: string = this.microPoolContract.methods.claim().encodeABI();
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
    return this.microPoolContract.methods
      .claimableRewardOf(staker)
      .call()
      .then((value: string) => {
        return this.keyProvider.getWeb3().utils.fromWei(value);
      });
  }

  public async poolCount(): Promise<BigNumber> {
    return this.microPoolContract.methods.poolCount().call();
  }

  public async pendingStakesOf(staker: string): Promise<BigNumber> {
    return this.microPoolContract.methods
      .pendingStakesOf(staker)
      .call()
      .then((value: string) =>
        new BigNumber(value).dividedBy(ETH_SCALE_FACTOR),
      );
  }

  public async getSystemContractParameters(): Promise<
    SystemContractParameters
  > {
    if (this.systemContractParameters) {
      return this.systemContractParameters;
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
    this.systemContractParameters = {
      providerMinimumStaking: new BigNumber(providerMinimumStaking).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
      requesterMinimumStaking: new BigNumber(requesterMinimumStaking).dividedBy(
        ANKR_SCALE_FACTOR,
      ),
      ethereumStakingAmount: new BigNumber(ethereumStakingAmount).dividedBy(
        ETH_SCALE_FACTOR,
      ),
    };
    console.log(
      `system contract parameters: ${JSON.stringify(
        this.systemContractParameters,
        null,
        2,
      )}`,
    );
    return this.systemContractParameters;
  }

  public async checkAnkrAllowance(): Promise<BigNumber> {
    if (!this.ankrContract || !this.contractConfig.ankrContract) {
      throw new Error('Ankr contract is not available now');
    }
    const currentAccount = await this.keyProvider.currentAccount();
    const allowance = await this.ankrContract.methods
      .allowance(currentAccount, this.contractConfig.stakingContract)
      .call();
    return new BigNumber(allowance).dividedBy(ANKR_SCALE_FACTOR);
  }

  public async approveAnkrToStakingContract(
    amount: BigNumber,
  ): Promise<SendAsyncResult> {
    if (!this.ankrContract || !this.contractConfig.ankrContract) {
      throw new Error('Ankr contract is not available now');
    }
    const data: string = this.ankrContract.methods
      .approve(
        this.contractConfig.stakingContract,
        amount.multipliedBy(ANKR_SCALE_FACTOR).toString(10),
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

  public async ankrBalance(address: string): Promise<string> {
    if (!this.ankrContract) {
      return '0';
    }
    return this.keyProvider.erc20Balance(this.ankrContract, address);
  }

  public async aEthBalance(address: string): Promise<string> {
    if (!this.aethContract) {
      return '0';
    }
    return this.keyProvider.erc20Balance(this.aethContract, address);
  }

  public async pendingEtherBalanceOf(provider: string): Promise<BigNumber> {
    return this.microPoolContract.methods
      .pendingEtherBalanceOf(provider)
      .call()
      .then((value: string) =>
        new BigNumber(value).dividedBy(ETH_SCALE_FACTOR),
      );
  }

  public async etherBalanceOf(provider: string): Promise<BigNumber> {
    return this.microPoolContract.methods
      .etherBalanceOf(provider)
      .call()
      .then((value: string) =>
        new BigNumber(value).dividedBy(ETH_SCALE_FACTOR),
      );
  }

  public async availableEtherBalanceOf(provider: string): Promise<BigNumber> {
    return this.microPoolContract.methods
      .availableEtherBalanceOf(provider)
      .call()
      .then((value: string) =>
        new BigNumber(value).dividedBy(ETH_SCALE_FACTOR),
      );
  }

  public async getAethRatio(): Promise<BigNumber> {
    return this.aethContract.methods
      .ratio()
      .call()
      .then((value: string) => {
        return new BigNumber(value).div(ETH_SCALE_FACTOR);
      });
  }

  public async vote(proposalId: string, vote: VoteStatus, options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await this.stkr.vote(proposalId, vote, options);
  }

  public async fetchProjects() {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await new GovernanceEvents(
      this.stkr.contracts.governance.getWeb3ContractInstance(),
    ).getPastPropose({ fromBlock: 0 });
  }

  public async createProject(
    timeSpan: number,
    topic: string,
    content: string,
    options?: SendOptions,
  ) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await this.stkr.propose(timeSpan, topic, content, options);
  }

  public async faucet(options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await this.stkr.faucet5m(options);
  }

  public async setAnkrAllowance(amount: string, options?: SendOptions) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await this.stkr.setAnkrAllowance(amount, options);
  }

  public async getAnkrGovernanceAllowance(owner: string): Promise<BN> {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await this.stkr.getAnkrGovernanceAllowance(owner);
  }

  public async getProposalInfo(proposalId: string) {
    if (!this.stkr) {
      throw ERROR_SDK_NOT_INITIALIZED;
    }

    return await this.stkr.getProposalInfo(proposalId);
  }
}
